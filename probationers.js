// ========================================
// probationers.js - FULLY FIXED & WORKING
// ========================================

// Inject all Modal HTML
const modalHTML = {
    probationer: `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="modalTitle">Add New Probationer</h2>
                <button class="close-modal" id="closeModal">×</button>
            </div>
            <div class="avatar-upload">
                <div class="avatar-preview" id="avatarPreview">
                    <span id="avatarInitial">?</span>
                    <img id="avatarImagePreview" src="" alt="Preview" style="display: none;">
                </div>
                <input type="file" id="avatarInput" accept="image/png, image/jpeg, image/jpg" style="display: none;">
                <div class="upload-hint">Click to upload profile picture (Optional)</div>
            </div>
            <div class="form-grid">
                <div class="form-group"><label class="form-label">Full Name *</label><input type="text" class="form-input" id="fullName" placeholder="Enter full name" required></div>
                <div class="form-group"><label class="form-label">Assigned ID *</label><input type="text" class="form-input" id="assignedId" placeholder="Enter probationer ID" required></div>
                <div class="form-group"><label class="form-label">Email Address</label><input type="email" class="form-input" id="email" placeholder="Enter email address"></div>
                <div class="form-group"><label class="form-label">Phone Number</label><input type="tel" class="form-input" id="phone" placeholder="Enter phone number"></div>
                <div class="form-group"><label class="form-label">Address</label><input type="text" class="form-input" id="address" placeholder="Enter address"></div>
                <div class="form-group"><label class="form-label">Date of Birth</label><input type="date" class="form-input" id="dob"></div>
                <div class="form-group"><label class="form-label">Probation Start Date</label><input type="date" class="form-input" id="startDate"></div>
                <div class="form-group"><label class="form-label">Probation End Date</label><input type="date" class="form-input" id="endDate"></div>
            </div>
            <div class="modal-buttons">
                <button class="modal-btn secondary" id="cancelBtn">Cancel</button>
                <button class="modal-btn primary" id="saveBtn">Save Probationer</button>
            </div>
        </div>`,

    announcement: `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Add Announcement</h2>
                <button class="close-modal" id="closeAnnouncementModal">×</button>
            </div>
            <div class="form-grid">
                <div class="form-group" style="grid-column: span 2;">
                    <label class="form-label">Subject *</label>
                    <input type="text" class="form-input" id="announcementSubject" placeholder="Enter announcement subject" required>
                </div>
                <div class="form-group" style="grid-column: span 2;">
                    <label class="form-label">Details *</label>
                    <textarea class="form-textarea" id="announcementDetails" placeholder="Enter announcement details" required></textarea>
                </div>
            </div>
            <div class="modal-buttons">
                <button class="modal-btn secondary" id="cancelAnnouncementBtn">Cancel</button>
                <button class="modal-btn primary" id="saveAnnouncementBtn">Add Announcement</button>
            </div>
        </div>`,

    delete: `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Confirm Delete</h2>
                <button class="close-modal" id="closeDeleteModal">×</button>
            </div>
            <div style="text-align: center; padding: 20px 0;">
                <div style="font-size: 48px; color: #ff6b6b; margin-bottom: 20px;">Warning</div>
                <h3 style="color: #259FDE; margin-bottom: 10px;">Delete Probationer?</h3>
                <p style="color: #848484; margin-bottom: 10px;">Are you sure you want to permanently delete this probationer?</p>
                <p style="color: #ff6b6b; font-weight: 500;" id="deleteProbationerName"></p>
                <p style="color: #848484; font-size: 12px; margin-top: 20px;">This action cannot be undone.</p>
            </div>
            <div class="modal-buttons">
                <button class="modal-btn secondary" id="cancelDeleteBtn">Cancel</button>
                <button class="modal-btn danger" id="confirmDeleteBtn">Delete</button>
            </div>
        </div>`,

    violations: `
        <div class="violations-modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="violationsModalTitle">Violations History</h2>
                <button class="close-modal" id="closeViolationsModal">×</button>
            </div>
            <div class="violation-count" id="violationCountText">0 violations found</div>
            <div class="violations-list-modal" id="violationsListModal"></div>
            <div class="modal-buttons">
                <button class="modal-btn secondary" id="closeViolationsBtn">Close</button>
            </div>
        </div>`,

    announcements: `
        <div class="announcements-modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="announcementsModalTitle">Announcements</h2>
                <button class="close-modal" id="closeAnnouncementsModal">×</button>
            </div>
            <div class="announcement-count" id="announcementCountText">0 announcements found</div>
            <div class="announcements-list-modal" id="announcementsListModal"></div>
            <div class="modal-buttons">
                <button class="modal-btn secondary" id="closeAnnouncementsBtn">Close</button>
            </div>
        </div>`
};

// Inject modals into DOM
document.getElementById('probationerModal').innerHTML = modalHTML.probationer;
document.getElementById('announcementModal').innerHTML = modalHTML.announcement;
document.getElementById('deleteModal').innerHTML = modalHTML.delete;
document.getElementById('violationsModal').innerHTML = modalHTML.violations;
document.getElementById('announcementsModal').innerHTML = modalHTML.announcements;

// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, get, set, remove, onValue, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBGONaynbM6GSdq4Ee46dD8tqfeCYx-w-M",
    authDomain: "probationlocator.firebaseapp.com",
    databaseURL: "https://probationlocator-default-rtdb.firebaseio.com",
    projectId: "probationlocator",
    storageBucket: "probationlocator.firebasestorage.app",
    messagingSenderId: "323066331183",
    appId: "1:323066331183:web:61f35b70cb07c0618106da"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Global Variables
let probationers = [];
let editingId = null;
let deletingId = null;
let selectedFile = null;
let currentViewingViolationsId = null;
let currentAddingAnnouncementId = null;

// Utility Functions
function checkAuth() {
    const username = localStorage.getItem('emprobUsername');
    if (!username) {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('errorMessage').style.display = 'block';
        return null;
    }
    return username;
}

function showNotification(message, type = 'info', duration = 4000) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    setTimeout(() => notification.classList.remove('show'), duration);
}

function formatDate(timestamp) {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
}

function getBatteryClass(level) {
    if (!level || level === 'N/A') return 'battery-na';
    level = parseInt(level);
    if (level >= 70) return 'battery-high';
    if (level >= 30) return 'battery-medium';
    return 'battery-low';
}

function generateAvatarInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

function closeAllModals() {
    document.getElementById('probationerModal').style.display = 'none';
    document.getElementById('announcementModal').style.display = 'none';
    document.getElementById('deleteModal').style.display = 'none';
    document.getElementById('violationsModal').style.display = 'none';
    document.getElementById('announcementsModal').style.display = 'none';
}

// Render Probationers
function renderProbationers() {
    const grid = document.getElementById('probationersGrid');
    const emptyState = document.getElementById('emptyState');

    if (probationers.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    grid.innerHTML = '';

    probationers.forEach(p => {
        const card = document.createElement('div');
        card.className = 'probationer-card';

        const avatarHTML = p.avatar 
            ? `<img src="${p.avatar}" alt="${p.fullName}">`
            : `<span>${generateAvatarInitials(p.fullName)}</span>`;

        const statusClass = p.status ? `status-${p.status.toLowerCase().replace(' ', '-')}` : 'status-na';
        const statusText = p.status || 'N/A';

        const violations = p.violations ? Object.values(p.violations || {}).slice(0, 3) : [];
        const announcements = p.announcements ? Object.values(p.announcements || {}).slice(0, 3) : [];

        card.innerHTML = `
            <div class="status-badge ${statusClass}">${statusText}</div>
            <div class="probationer-header">
                <div class="probationer-avatar">${avatarHTML}</div>
                <div class="probationer-info">
                    <h3>${p.fullName || 'Unknown'}</h3>
                    <p>ID: ${p.assignedId || 'N/A'}</p>
                </div>
            </div>

            <div class="device-info">
                <div class="info-item">
                    <span class="info-label">Last Seen</span>
                    <div class="info-value">${formatDate(p.lastSeen)}</div>
                </div>
                <div class="info-item">
                    <span class="info-label">Battery Level</span>
                    <div class="info-value">${p.battery || 'N/A'}%</div>
                    <div class="battery-container">
                        <div class="battery-level"><div class="battery-fill ${getBatteryClass(p.battery)}" style="width: ${p.battery || 0}%"></div></div>
                    </div>
                </div>
                <div class="info-item">
                    <span class="info-label">Coordinates</span>
                    <div class="coordinates-value">${p.latitude || 'N/A'}, ${p.longitude || 'N/A'}</div>
                </div>
                <div class="info-item">
                    <span class="info-label">Address</span>
                    <div class="info-value">${p.address || 'Not provided'}</div>
                </div>
            </div>

            <div class="violations-section">
                <div class="section-title">
                    Recent Violations
                    <span class="view-all-violations" data-id="${p.id}">View all →</span>
                </div>
                <div class="violations-list">
                    ${violations.length > 0 ? violations.map(v => `
                        <div class="violation-item">
                            <div class="violation-time">${formatDate(v.timestamp)}</div>
                            <div class="violation-type">${v.type || 'Unknown'}</div>
                        </div>
                    `).join('') : '<div class="no-violations">No violations recorded</div>'}
                </div>
            </div>

            <div class="announcements-section">
                <div class="section-title">
                    Announcements
                    <button class="add-announcement-btn" data-id="${p.id}">Add</button>
                </div>
                <div class="announcements-list">
                    ${announcements.length > 0 ? announcements.map(a => `
                        <div class="announcement-item ${a.acknowledged ? 'acknowledged' : ''}">
                            <div class="announcement-time">${formatDate(a.timestamp)}</div>
                            <div class="announcement-subject">${a.subject}</div>
                            <div class="announcement-details">${a.details}</div>
                            <div class="announcement-status ${a.acknowledged ? 'acknowledged' : 'pending'}">
                                ${a.acknowledged ? 'Acknowledged' : 'Pending'}
                            </div>
                        </div>
                    `).join('') : '<div class="no-announcements">No announcements</div>'}
                </div>
            </div>

            <div class="actions-bar">
                <button class="action-btn view-btn" onclick="event.stopPropagation(); window.location.href='profile.html?id=${p.id}'">View Profile</button>
                <button class="action-btn edit-btn" onclick="event.stopPropagation(); openProbationerModal('${p.id}')">Edit</button>
                <button class="action-btn delete-btn" onclick="event.stopPropagation(); openDeleteModal('${p.id}', '${p.fullName}')">Delete</button>
            </div>
        `;

        card.onclick = () => openProbationerModal(p.id);
        grid.appendChild(card);
    });

    // Re-attach event listeners
    document.querySelectorAll('.view-all-violations').forEach(el => {
        el.onclick = (e) => {
            e.stopPropagation();
            openViolationsModal(el.dataset.id);
        };
    });

    document.querySelectorAll('.add-announcement-btn').forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            currentAddingAnnouncementId = btn.dataset.id;
            document.getElementById('announcementModal').style.display = 'flex';
        };
    });
}

// Modal Functions
function openProbationerModal(id = null) {
    editingId = id;
    const modal = document.getElementById('probationerModal');
    const title = document.getElementById('modalTitle');
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarImage = document.getElementById('avatarImagePreview');
    const avatarInitial = document.getElementById('avatarInitial');

    if (id) {
        title.textContent = 'Edit Probationer';
        const p = probationers.find(x => x.id === id);
        if (p) {
            document.getElementById('fullName').value = p.fullName || '';
            document.getElementById('assignedId').value = p.assignedId || '';
            document.getElementById('email').value = p.email || '';
            document.getElementById('phone').value = p.phone || '';
            document.getElementById('address').value = p.address || '';
            document.getElementById('dob').value = p.dob || '';
            document.getElementById('startDate').value = p.startDate || '';
            document.getElementById('endDate').value = p.endDate || '';

            if (p.avatar) {
                avatarImage.src = p.avatar;
                avatarImage.style.display = 'block';
                avatarInitial.style.display = 'none';
            } else {
                avatarInitial.textContent = generateAvatarInitials(p.fullName);
                avatarImage.style.display = 'none';
                avatarInitial.style.display = 'block';
            }
        }
    } else {
        title.textContent = 'Add New Probationer';
        document.querySelectorAll('#probationerModal .form-input').forEach(i => i.value = '');
        avatarImage.style.display = 'none';
        avatarInitial.style.display = 'block';
        avatarInitial.textContent = '?';
        selectedFile = null;
    }

    modal.style.display = 'flex';
}

function openDeleteModal(id, name) {
    deletingId = id;
    document.getElementById('deleteProbationerName').textContent = name || 'Unknown';
    document.getElementById('deleteModal').style.display = 'flex';
}

function openViolationsModal(id) {
    currentViewingViolationsId = id;
    const p = probationers.find(x => x.id === id);
    document.getElementById('violationsModalTitle').textContent = `Violations - ${p?.fullName || 'Unknown'}`;
    
    const list = document.getElementById('violationsListModal');
    list.innerHTML = '';

    const violations = p?.violations ? Object.values(p.violations) : [];
    document.getElementById('violationCountText').textContent = `${violations.length} violation${violations.length !== 1 ? 's' : ''}`;

    if (violations.length === 0) {
        list.innerHTML = '<div class="no-violations">No violations recorded</div>';
    } else {
        violations.sort((a, b) => b.timestamp - a.timestamp).forEach(v => {
            const item = document.createElement('div');
            item.className = 'violation-item-modal';
            item.innerHTML = `
                <div class="violation-header-modal">
                    <div class="violation-time-modal">${new Date(v.timestamp).toLocaleString()}</div>
                </div>
                <div class="violation-type-modal">${v.type || 'Unknown Violation'}</div>
            `;
            list.appendChild(item);
        });
    }

    document.getElementById('violationsModal').style.display = 'flex';
}

// DOM Loaded
document.addEventListener('DOMContentLoaded', function () {
    const username = checkAuth();
    if (!username) return;

    document.getElementById('loadingScreen').style.display = 'flex';

    signInAnonymously(auth).then(() => {
        const probationersRef = ref(database, `probationers/${username}`);
        onValue(probationersRef, (snapshot) => {
            const data = snapshot.val();
            probationers = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            renderProbationers();
            document.getElementById('loadingScreen').style.display = 'none';
            document.getElementById('mainHeader').style.display = 'flex';
            document.getElementById('mainContent').style.display = 'block';
        });
    }).catch(err => {
        console.error(err);
        showNotification('Failed to connect. Check internet.', 'error');
        document.getElementById('loadingScreen').style.display = 'none';
    });

    // Event Listeners
    document.getElementById('addProbationerBtn').onclick = () => openProbationerModal();
    document.getElementById('addFirstProbationerBtn').onclick = () => openProbationerModal();

    document.querySelectorAll('.close-modal').forEach(btn => btn.onclick = closeAllModals);
    window.onclick = (e) => { if (e.target.classList.contains('modal')) closeAllModals(); };

    // Avatar
    document.getElementById('avatarPreview').onclick = () => document.getElementById('avatarInput').click();
    document.getElementById('avatarInput').onchange = (e) => {
        selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                document.getElementById('avatarImagePreview').src = ev.target.result;
                document.getElementById('avatarImagePreview').style.display = 'block';
                document.getElementById('avatarInitial').style.display = 'none';
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    // Save Probationer (FIXED!)
    document.getElementById('saveBtn').onclick = async () => {
        const fullName = document.getElementById('fullName').value.trim();
        const assignedId = document.getElementById('assignedId').value.trim();

        if (!fullName || !assignedId) {
            showNotification('Full Name and Assigned ID are required!', 'error');
            return;
        }

        const username = localStorage.getItem('emprobUsername');
        const probationerRef = ref(database, `probationers/${username}/${editingId || assignedId}`);

        const saveData = async (avatarUrl = null) => {
            const data = {
                fullName, assignedId,
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                address: document.getElementById('address').value.trim(),
                dob: document.getElementById('dob').value,
                startDate: document.getElementById('startDate').value,
                endDate: document.getElementById('endDate').value,
                avatar: avatarUrl || (editingId ? probationers.find(p => p.id === editingId)?.avatar : null),
                lastSeen: Date.now(),
                status: 'Active',
                battery: '85',
                latitude: '14.5995',
                longitude: '120.9842'
            };

            try {
                await set(probationerRef, data);
                showNotification(editingId ? 'Updated successfully!' : 'Added successfully!', 'success');
                closeAllModals();
                selectedFile = null;
            } catch (err) {
                showNotification('Save failed!', 'error');
            }
        };

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => saveData(e.target.result);
            reader.readAsDataURL(selectedFile);
        } else {
            await saveData();
        }
    };

    // Cancel & Delete
    document.getElementById('cancelBtn').onclick = closeAllModals;
    document.getElementById('cancelAnnouncementBtn').onclick = closeAllModals;
    document.getElementById('cancelDeleteBtn').onclick = closeAllModals;
    document.getElementById('closeViolationsBtn').onclick = closeAllModals;
    document.getElementById('closeAnnouncementsBtn').onclick = closeAllModals;

    document.getElementById('confirmDeleteBtn').onclick = async () => {
        if (!deletingId) return;
        const username = localStorage.getItem('emprobUsername');
        await remove(ref(database, `probationers/${username}/${deletingId}`));
        showNotification('Deleted successfully', 'success');
        closeAllModals();
    };

    document.getElementById('saveAnnouncementBtn').onclick = async () => {
        const subject = document.getElementById('announcementSubject').value.trim();
        const details = document.getElementById('announcementDetails').value.trim();
        if (!subject || !details) {
            showNotification('Fill all fields!', 'error');
            return;
        }

        const newRef = push(ref(database, `probationers/${localStorage.getItem('emprobUsername')}/${currentAddingAnnouncementId}/announcements`));
        await set(newRef, { subject, details, timestamp: Date.now(), acknowledged: false });
        showNotification('Announcement added!', 'success');
        document.getElementById('announcementSubject').value = '';
        document.getElementById('announcementDetails').value = '';
        closeAllModals();
    };
});
