import './RecentActivityTable.css'

interface Activity {
  company: string
  uploadedBy: string
  uploadDate: string
  status: 'Published' | 'Pending' | 'Draft'
}

interface RecentActivityTableProps {
  activities: Activity[]
}

export default function RecentActivityTable({ activities }: RecentActivityTableProps) {
  return (
    <div className="recent-activity">
      <div className="recent-activity-header">
        <h3 className="recent-activity-title">Recent Activity</h3>
      </div>
      <div className="recent-activity-table-wrapper">
        <table className="recent-activity-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Uploaded By</th>
              <th>Upload Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index}>
                <td><span className="recent-activity-company">{activity.company}</span></td>
                <td><span className="recent-activity-meta">{activity.uploadedBy}</span></td>
                <td><span className="recent-activity-meta">{activity.uploadDate}</span></td>
                <td>
                  <span className={`recent-activity-badge ${activity.status.toLowerCase()}`}>
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
