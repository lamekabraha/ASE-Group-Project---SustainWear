import React from 'react';

const reportStats = [
  { label: 'Total Reports', value: '12', color: 'border-blue-500' },
  { label: 'Resolved Issues', value: '8', color: 'border-green-500' },
  { label: 'Pending Review', value: '4', color: 'border-yellow-500' },
];

const recentReports = [
  { id: 101, user: 'p.singh@outlook.com', type: 'System Bug', date: '2025-11-26', status: 'Pending' },
  { id: 102, user: 'c.rodriguiz@outlook.com', type: 'Donation Issue', date: '2025-11-25', status: 'Resolved' },
  { id: 103, user: 'a.pattel@outlook.com', type: 'Account Access', date: '2025-11-24', status: 'Resolved' },
];

export default function AdminReportsPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Reports</h1>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {reportStats.map((stat, index) => (
          <div key={index} className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${stat.color}`}>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{stat.label}</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Report Activity (Last 7 Days)</h2>
        
        {}
        <div className="relative h-64 w-full">
          {}
          <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-xs text-gray-400 text-right pr-2">
            <span>5</span>
            <span>4</span>
            <span>3</span>
            <span>2</span>
            <span>1</span>
            <span>0</span>
          </div>

          {}
          <div className="absolute left-8 right-0 top-2 bottom-6 border-l border-b border-gray-200">
            {}
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="absolute w-full border-t border-gray-100 border-dashed" style={{ top: `${i * 20}%` }}></div>
            ))}

            {}
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              {}
              <polyline
                fill="none"
                stroke="#4F46E5" 
                strokeWidth="2"
                points="0,200 150,160 300,100 450,140 600,80 800,120 1200,40"
              />
            </svg>
          </div>

          {}
          <div className="absolute left-8 right-0 bottom-0 flex justify-between text-xs text-gray-400 pt-2">
            <span>Nov 20</span>
            <span>Nov 21</span>
            <span>Nov 22</span>
            <span>Nov 23</span>
            <span>Nov 24</span>
            <span>Nov 25</span>
            <span>Nov 26</span>
          </div>
        </div>
      </div>

      {}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Recent Reports</h2>
          <select className="border border-gray-300 text-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Resolved</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Submitted By</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Issue Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-600">#{report.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{report.user}</td>
                  <td className="px-6 py-4 text-gray-600">{report.type}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${report.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700">View</button>
                    <button className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded text-sm hover:bg-gray-200">Archive</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}