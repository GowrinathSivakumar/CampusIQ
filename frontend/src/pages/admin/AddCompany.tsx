 import { Building2, Upload } from 'lucide-react'
import './AddCompany.css'

export default function AddCompany() {
  return (
    <div className="add-company-page">
      <div>
        <h1>Add Company</h1>
        <p>Register a new placement company</p>
      </div>

      <div className="add-company-card">
        <form className="add-company-form" onSubmit={(e) => e.preventDefault()}>
          <div className="add-company-grid">
            <div className="add-company-field">
              <label>Company Name</label>
              <input type="text" placeholder="e.g. Microsoft" />
            </div>
            <div className="add-company-field">
              <label>Industry</label>
              <input type="text" placeholder="e.g. Technology" />
            </div>
            <div className="add-company-field">
              <label>Website</label>
              <input type="url" placeholder="https://example.com" />
            </div>
            <div className="add-company-field">
              <label>Location</label>
              <input type="text" placeholder="e.g. Bengaluru" />
            </div>
            <div className="add-company-field">
              <label>Contact Email</label>
              <input type="email" placeholder="hr@company.com" />
            </div>
            <div className="add-company-field">
              <label>Contact Phone</label>
              <input type="tel" placeholder="+91 98765 43210" />
            </div>
          </div>

          <div className="add-company-field">
            <label>Description</label>
            <textarea rows={3} placeholder="Brief description about the company..." />
          </div>

          <div className="add-company-field">
            <label>Company Logo</label>
            <div className="add-company-upload">
              <Upload size={24} className="add-company-upload-icon" />
              <p>Drop logo here or click to upload</p>
              <span>PNG, JPG up to 2MB</span>
            </div>
          </div>

          <div className="add-company-actions">
            <button type="submit" className="add-company-submit">
              <Building2 size={16} />
              Add Company
            </button>
            <button type="reset" className="add-company-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
