// ============================================================
// AKV GLOBAL CONSULTANCY — Off-Plan Admin Dashboard Component
// ============================================================
import React, { useState, useEffect, useRef } from 'react';
import {
  getOffPlanProjects,
  addOffPlanProject,
  updateOffPlanProject,
  deleteOffPlanProject,
  resetOffPlanProjects
} from '../utils/offplanStore';
import './AdminDashboard.css';
import {
  Plus, Edit3, Trash2, Search, Building2, MapPin,
  Image as ImageIcon, UploadCloud, X, CheckCircle,
  RefreshCw, LayoutGrid, List, ArrowLeft, LogOut
} from 'lucide-react';

const DEVELOPER_OPTIONS = ['Emaar Properties', 'DAMAC Properties', 'Sobha Realty', 'Azizi Developments', 'Nakheel', 'Select Group', 'Deyaar'];
const CATEGORY_OPTIONS = ['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Retail'];
const STOCK_PRESET_IMAGES = [
  'images/offplan.png',
  'images/creek_views.jpg',
  'images/venice_residences.jpg',
  'images/damac_lagoons.jpg',
  'images/sobha_central.jpg',
  'images/venice_retail.jpg',
  'images/penthouse.png',
  'images/villa.png',
  'images/apartment.png',
  'images/downtown_dubai.png',
  'images/palm_jumeirah.png',
  'images/dubai_marina.png'
];

export default function AdminDashboard({ onNavigate, onLogout }) {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDeveloper, setFilterDeveloper] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [editingId, setEditingId] = useState(null);
  
  // Delete confirmation modal state
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  
  // Toast Notification state
  const [toastMessage, setToastMessage] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    developer: 'Emaar Properties',
    customDeveloper: '',
    location: '',
    price: '',
    paymentPlan: '60/40',
    completion: 'Q4 2026',
    category: 'Apartment',
    beds: 2,
    baths: 2,
    area: '1,400',
    desc: '',
    amenities: 'Lagoon Access, Swimming Pool, Fitness Center, 24/7 Security, Valet Parking',
    imgUrlInput: '',
    images: []
  });

  const fileInputRef = useRef(null);

  // Load project list on mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const list = getOffPlanProjects();
    setProjects(list);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Filtered Project List
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.developer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDev = !filterDeveloper || p.developer === filterDeveloper;
    const matchesCat = !filterCategory || (p.category && p.category.toLowerCase() === filterCategory.toLowerCase());
    return matchesSearch && matchesDev && matchesCat;
  });

  // Calculate Metrics
  const totalProjects = projects.length;

  // Form Reset / Open Create Modal
  const handleOpenCreateModal = () => {
    setFormData({
      name: '',
      developer: 'Emaar Properties',
      customDeveloper: '',
      location: 'Downtown Dubai',
      price: 'AED 2,100,000',
      paymentPlan: '70/30',
      completion: 'Q4 2026',
      category: 'Apartment',
      beds: 2,
      baths: 2,
      area: '1,450',
      desc: 'Exclusive luxury off-plan development with state-of-the-art amenities and prime location in Dubai.',
      amenities: 'Infinity Pool, Private Beach, Concierge, Valet Parking, Spa & Gym',
      imgUrlInput: '',
      images: ['images/offplan.png', 'images/penthouse.png']
    });
    setModalMode('create');
    setEditingId(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (project) => {
    setFormData({
      name: project.name || '',
      developer: DEVELOPER_OPTIONS.includes(project.developer) ? project.developer : 'Other',
      customDeveloper: DEVELOPER_OPTIONS.includes(project.developer) ? '' : project.developer,
      location: project.location || '',
      price: project.price || '',
      paymentPlan: project.paymentPlan || '60/40',
      completion: project.completion || 'Q4 2026',
      category: project.category || 'Apartment',
      beds: project.beds || 2,
      baths: project.baths || 2,
      area: project.area || '1,200',
      desc: project.desc || '',
      amenities: Array.isArray(project.amenities) ? project.amenities.join(', ') : (project.amenities || ''),
      imgUrlInput: '',
      images: project.images && project.images.length > 0 ? project.images : [project.img || 'images/offplan.png']
    });
    setEditingId(project.id);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  // Handle File Upload (FileReader Base64 conversion for persistence)
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, dataUrl]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle Add Image URL Input
  const handleAddImageUrl = () => {
    if (!formData.imgUrlInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, prev.imgUrlInput.trim()],
      imgUrlInput: ''
    }));
  };

  // Add Stock Preset Image
  const handleSelectPresetImage = (url) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, url]
    }));
  };

  // Remove Image from Gallery
  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Set Primary / Main Thumbnail Image
  const handleSetMainImage = (index) => {
    setFormData(prev => {
      const updated = [...prev.images];
      const [selected] = updated.splice(index, 1);
      return {
        ...prev,
        images: [selected, ...updated]
      };
    });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.location.trim()) {
      alert('Please fill in Project Name and Location.');
      return;
    }

    const finalDeveloper = formData.developer === 'Other' ? (formData.customDeveloper || 'Leading Developer') : formData.developer;
    const amenitiesArray = formData.amenities.split(',').map(a => a.trim()).filter(Boolean);
    const finalImages = formData.images.length > 0 ? formData.images : ['images/offplan.png'];

    const projectPayload = {
      name: formData.name,
      developer: finalDeveloper,
      location: formData.location,
      price: formData.price.startsWith('AED') ? formData.price : `AED ${formData.price}`,
      paymentPlan: formData.paymentPlan,
      completion: formData.completion,
      category: formData.category,
      type: `Off-Plan ${formData.category}`,
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      area: String(formData.area),
      desc: formData.desc,
      amenities: amenitiesArray,
      img: finalImages[0],
      images: finalImages,
      community: formData.location
    };

    if (modalMode === 'create') {
      const updatedList = addOffPlanProject(projectPayload);
      setProjects(updatedList);
      showToast(`Project "${formData.name}" added successfully!`);
    } else {
      const updatedList = updateOffPlanProject(editingId, projectPayload);
      setProjects(updatedList);
      showToast(`Project "${formData.name}" updated successfully!`);
    }

    setIsModalOpen(false);
  };

  // Delete Project Execution
  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    const target = projects.find(p => p.id === deleteConfirmId);
    const updatedList = deleteOffPlanProject(deleteConfirmId);
    setProjects(updatedList);
    setDeleteConfirmId(null);
    showToast(`Project "${target ? target.name : 'Project'}" deleted.`);
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all off-plan projects to initial defaults? Custom added projects will be removed.')) {
      const resetList = resetOffPlanProjects();
      setProjects(resetList);
      showToast('All Off-Plan projects reset to defaults.');
    }
  };

  return (
    <div className="admin-page">
      {/* ── HEADER SECTION ── */}
      <header className="admin-header">
        <div className="container">
          <div className="admin-header-row">
            <div>
              <button 
                onClick={() => onNavigate('home')} 
                style={{ background: 'none', border: 'none', color: '#94a3b8', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', marginBottom: '12px' }}
              >
                <ArrowLeft size={14} /> Back to Main Site
              </button>
              <h1 className="admin-title">Off-Plan Projects Admin</h1>
              <p className="admin-sub">Manage, upload image assets, create, edit, and publish Dubai off-plan developments.</p>
            </div>

            <div className="admin-header-actions">
              <button className="btn-admin-secondary" onClick={handleResetDefaults}>
                <RefreshCw size={15} /> Reset Defaults
              </button>
              <button className="btn-admin-primary" onClick={handleOpenCreateModal}>
                <Plus size={18} /> Add New Project
              </button>
              {onLogout && (
                <button className="btn-admin-secondary" onClick={onLogout} style={{ borderColor: 'rgba(239, 68, 68, 0.3)', color: '#f87171' }} title="Log out of Admin Dashboard">
                  <LogOut size={16} /> Log Out
                </button>
              )}
            </div>
          </div>

          {/* ── METRICS OVERVIEW ── */}
          <div className="admin-metrics-grid" style={{ gridTemplateColumns: 'minmax(240px, 320px)' }}>
            <div className="metric-card">
              <div className="metric-icon"><Building2 size={24} /></div>
              <div>
                <div className="metric-val">{totalProjects}</div>
                <div className="metric-label">Total Off-Plan Projects</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="container" style={{ marginTop: '20px' }}>
        {/* ── TOOLBAR / FILTERS ── */}
        <div className="admin-toolbar">
          <div className="admin-search-wrap">
            <Search size={18} />
            <input
              type="text"
              className="admin-search-input"
              placeholder="Search by project name, developer, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="admin-filter-group">
            <select
              className="admin-select"
              value={filterDeveloper}
              onChange={(e) => setFilterDeveloper(e.target.value)}
            >
              <option value="">All Developers</option>
              {DEVELOPER_OPTIONS.map(dev => (
                <option key={dev} value={dev}>{dev}</option>
              ))}
            </select>

            <select
              className="admin-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {CATEGORY_OPTIONS.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <div className="view-toggle-admin">
              <button
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Table View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── PROJECTS DISPLAY ── */}
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'rgba(18, 23, 33, 0.5)', borderRadius: '16px', border: '1px dashed rgba(255, 255, 255, 0.1)' }}>
            <Building2 size={48} style={{ color: '#64748b', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '8px' }}>No Off-Plan Projects Found</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Try clearing your filters or create a new off-plan project listing.</p>
            <button className="btn-admin-primary" onClick={handleOpenCreateModal}>
              <Plus size={16} /> Create Off-Plan Project
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* ── GRID VIEW ── */
          <div className="admin-project-grid">
            {filteredProjects.map(p => (
              <div key={p.id} className="admin-card">
                <div className="admin-card-img-wrap">
                  <img src={p.img || (p.images && p.images[0])} alt={p.name} />
                  <div className="admin-card-badges">
                    <span className="badge-dev">{p.developer}</span>
                    <span className="badge-comp">{p.completion}</span>
                  </div>
                </div>

                <div className="admin-card-body">
                  <h3 className="admin-card-title">{p.name}</h3>
                  <div className="admin-card-location">
                    <MapPin size={14} style={{ color: 'var(--c-gold)' }} />
                    {p.location}
                  </div>

                  <div className="admin-card-specs">
                    <div>
                      <div className="spec-item-val">{p.beds} Beds</div>
                      <div className="spec-item-lbl">Bedrooms</div>
                    </div>
                    <div>
                      <div className="spec-item-val">{p.baths} Baths</div>
                      <div className="spec-item-lbl">Bathrooms</div>
                    </div>
                    <div>
                      <div className="spec-item-val">{p.area} sqft</div>
                      <div className="spec-item-lbl">Size</div>
                    </div>
                  </div>

                  <div className="admin-card-price-row">
                    <div>
                      <div className="admin-price-lbl">Starting From</div>
                      <div className="admin-price-val">{p.price}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="admin-price-lbl">Payment Plan</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#38bdf8' }}>{p.paymentPlan}</div>
                    </div>
                  </div>

                  <div className="admin-card-actions">
                    <button className="btn-card-action btn-card-edit" onClick={() => handleOpenEditModal(p)}>
                      <Edit3 size={14} /> Edit
                    </button>
                    <button className="btn-card-action btn-card-delete" onClick={() => setDeleteConfirmId(p.id)}>
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── TABLE VIEW ── */
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Developer</th>
                  <th>Specs</th>
                  <th>Price</th>
                  <th>Payment Plan</th>
                  <th>Completion</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className="table-proj-info">
                        <img src={p.img || (p.images && p.images[0])} alt={p.name} className="table-thumb" />
                        <div>
                          <div className="table-proj-name">{p.name}</div>
                          <div className="table-proj-loc">{p.location}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge-dev">{p.developer}</span>
                    </td>
                    <td>
                      <div style={{ fontSize: '13px', color: '#cbd5e1' }}>{p.beds} Beds | {p.baths} Baths</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{p.area} sqft</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--c-gold)' }}>{p.price}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '13px', color: '#38bdf8' }}>{p.paymentPlan}</span>
                    </td>
                    <td>
                      <span className="badge-comp">{p.completion}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button className="btn-card-action btn-card-edit" style={{ padding: '6px 12px' }} onClick={() => handleOpenEditModal(p)}>
                          <Edit3 size={14} /> Edit
                        </button>
                        <button className="btn-card-action btn-card-delete" style={{ padding: '6px 12px' }} onClick={() => setDeleteConfirmId(p.id)}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* ── CREATE / EDIT PROJECT MODAL ── */}
      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                {modalMode === 'create' ? (
                  <><Plus size={20} style={{ color: 'var(--c-gold)' }} /> Add New Off-Plan Project</>
                ) : (
                  <><Edit3 size={20} style={{ color: 'var(--c-gold)' }} /> Edit Off-Plan Project</>
                )}
              </h2>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
              <div className="admin-modal-body">
                <div className="admin-form-grid">
                  {/* Project Name */}
                  <div className="form-group-full">
                    <label className="admin-label">Project Name *</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Marina Horizon Towers"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  {/* Developer */}
                  <div>
                    <label className="admin-label">Developer *</label>
                    <select
                      className="admin-input"
                      value={formData.developer}
                      onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                    >
                      {DEVELOPER_OPTIONS.map(dev => (
                        <option key={dev} value={dev}>{dev}</option>
                      ))}
                      <option value="Other">Other / Custom Developer</option>
                    </select>
                  </div>

                  {formData.developer === 'Other' && (
                    <div>
                      <label className="admin-label">Custom Developer Name</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="Enter Developer Name"
                        value={formData.customDeveloper}
                        onChange={(e) => setFormData({ ...formData, customDeveloper: e.target.value })}
                      />
                    </div>
                  )}

                  {/* Location */}
                  <div>
                    <label className="admin-label">Location / Community *</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Dubai South, Downtown Dubai"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>

                  {/* Property Category */}
                  <div>
                    <label className="admin-label">Property Category</label>
                    <select
                      className="admin-input"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {CATEGORY_OPTIONS.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="admin-label">Starting Price *</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. AED 1,850,000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  {/* Payment Plan */}
                  <div>
                    <label className="admin-label">Payment Plan</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. 60/40 or 80/20"
                      value={formData.paymentPlan}
                      onChange={(e) => setFormData({ ...formData, paymentPlan: e.target.value })}
                    />
                  </div>

                  {/* Completion Date */}
                  <div>
                    <label className="admin-label">Estimated Completion</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Q4 2026"
                      value={formData.completion}
                      onChange={(e) => setFormData({ ...formData, completion: e.target.value })}
                    />
                  </div>

                  {/* Beds, Baths, Area */}
                  <div>
                    <label className="admin-label">Bedrooms</label>
                    <input
                      type="number"
                      className="admin-input"
                      value={formData.beds}
                      onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin-label">Bathrooms</label>
                    <input
                      type="number"
                      className="admin-input"
                      value={formData.baths}
                      onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin-label">Area Size (sqft)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. 1,450"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    />
                  </div>

                  {/* Description */}
                  <div className="form-group-full">
                    <label className="admin-label">Project Overview / Description</label>
                    <textarea
                      className="admin-textarea"
                      placeholder="Describe the architectural design, location benefits, view, and unique selling points..."
                      value={formData.desc}
                      onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    ></textarea>
                  </div>

                  {/* Amenities */}
                  <div className="form-group-full">
                    <label className="admin-label">Amenities (Comma Separated)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Crystal Lagoon, Private Beach, Infinity Pool, Gym, Smart Home"
                      value={formData.amenities}
                      onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                    />
                  </div>

                  {/* ── IMAGE UPLOAD & GALLERY SECTION ── */}
                  <div className="form-group-full" style={{ marginTop: '10px' }}>
                    <label className="admin-label" style={{ fontSize: '15px', color: 'var(--c-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ImageIcon size={18} /> Project Image Assets & Gallery
                    </label>

                    {/* File Upload Zone */}
                    <div className="image-upload-zone" onClick={() => fileInputRef.current?.click()}>
                      <UploadCloud size={36} className="upload-icon" />
                      <div className="upload-text-main">Click or Drag & Drop Local Image Files to Upload</div>
                      <div className="upload-text-sub">Supports JPG, PNG, WEBP. Converted to persistent data URLs.</div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        multiple
                        style={{ display: 'none' }}
                      />
                    </div>

                    {/* Image URL Direct Input */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="Or paste direct image URL (https://...)"
                        value={formData.imgUrlInput}
                        onChange={(e) => setFormData({ ...formData, imgUrlInput: e.target.value })}
                      />
                      <button
                        type="button"
                        className="btn-admin-secondary"
                        onClick={handleAddImageUrl}
                        style={{ flexShrink: 0 }}
                      >
                        Add Image URL
                      </button>
                    </div>

                    {/* Stock Preset Selector */}
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Or pick from luxury Dubai image presets:</span>
                      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
                        {STOCK_PRESET_IMAGES.map((preset, idx) => (
                          <img
                            key={idx}
                            src={preset}
                            alt="Preset"
                            onClick={() => handleSelectPresetImage(preset)}
                            style={{ width: '60px', height: '45px', borderRadius: '6px', cursor: 'pointer', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.2)' }}
                            title="Click to add preset photo"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Gallery Thumbnails List */}
                    {formData.images.length > 0 && (
                      <div>
                        <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: 600 }}>
                          Project Gallery ({formData.images.length} photos) — First photo is the main card thumbnail:
                        </span>
                        <div className="gallery-preview-grid">
                          {formData.images.map((imgUrl, idx) => (
                            <div key={idx} className="gallery-thumb-item">
                              <img src={imgUrl} alt={`Gallery ${idx}`} />
                              {idx === 0 && <span className="gallery-thumb-main-badge">Main</span>}
                              <button
                                type="button"
                                className="gallery-thumb-remove"
                                onClick={() => handleRemoveImage(idx)}
                                title="Remove Image"
                              >
                                <X size={12} />
                              </button>
                              {idx !== 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleSetMainImage(idx)}
                                  style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '9px', border: 'none', padding: '2px 4px', borderRadius: '3px', cursor: 'pointer' }}
                                >
                                  Make Main
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="btn-admin-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary">
                  <CheckCircle size={16} />
                  {modalMode === 'create' ? 'Publish Project' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteConfirmId && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirmId(null)}>
          <div className="admin-modal" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2 className="admin-modal-title" style={{ color: '#ef4444' }}>
                <Trash2 size={20} /> Delete Project?
              </h2>
              <button className="admin-modal-close" onClick={() => setDeleteConfirmId(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="admin-modal-body" style={{ padding: '24px' }}>
              <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.6 }}>
                Are you sure you want to delete this off-plan project? This action will remove it from the Admin Dashboard and the public website listing.
              </p>
            </div>
            <div className="admin-modal-footer">
              <button className="btn-admin-secondary" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button className="btn-card-action btn-card-delete" style={{ padding: '10px 20px', fontSize: '14px' }} onClick={handleDeleteConfirm}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST NOTIFICATION ── */}
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle size={18} style={{ color: 'var(--c-gold)' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
