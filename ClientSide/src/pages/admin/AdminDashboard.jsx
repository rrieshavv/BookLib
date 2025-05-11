import React from 'react'
import { FiHome, FiUsers, FiSettings, FiPieChart, FiShoppingBag, FiFileText, FiLogOut } from 'react-icons/fi'

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <div className="flex flex-col flex-grow p-4 overflow-auto">
          <nav className="flex-1 space-y-2">
            <SidebarItem icon={<FiHome className="h-5 w-5" />} text="Dashboard" active />
            <SidebarItem icon={<FiUsers className="h-5 w-5" />} text="Users" />
            <SidebarItem icon={<FiShoppingBag className="h-5 w-5" />} text="Products" />
            <SidebarItem icon={<FiFileText className="h-5 w-5" />} text="Orders" />
            <SidebarItem icon={<FiPieChart className="h-5 w-5" />} text="Analytics" />
            <SidebarItem icon={<FiSettings className="h-5 w-5" />} text="Settings" />
          </nav>
          <div className="mt-auto mb-4">
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100">
              <FiLogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
          <div className="flex items-center">
            <button className="md:hidden p-2 rounded-lg focus:outline-none focus:ring">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="relative ml-4">
              <input
                type="text"
                className="w-64 px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search..."
              />
              <div className="absolute left-3 top-2.5">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  AD
                </div>
                <span className="hidden md:inline-block">Admin</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h2>
            <p className="text-gray-600">Welcome back, Admin</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard title="Total Users" value="1,254" change="+12%" icon={<FiUsers className="h-6 w-6" />} />
            <StatCard title="Total Revenue" value="$34,543" change="+8%" icon={<FiPieChart className="h-6 w-6" />} />
            <StatCard title="Total Orders" value="543" change="+3%" icon={<FiShoppingBag className="h-6 w-6" />} />
            <StatCard title="Pending Orders" value="24" change="-2%" icon={<FiFileText className="h-6 w-6" />} negative />
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Sales Overview</h3>
                <select className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                </select>
              </div>
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">Chart will be displayed here</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium text-gray-800">Order #{1000 + item}</p>
                      <p className="text-sm text-gray-500">2 items • $12{item * 7}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${item % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {item % 2 === 0 ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all orders →
              </button>
            </div>
          </div>

          {/* Recent Users Table */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Users</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Add New User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                            U{item}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">User {item}</div>
                            <div className="text-sm text-gray-500">Joined 2 days ago</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">user{item}@example.com</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {item % 2 === 0 ? 'Admin' : 'Customer'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Reusable components
const SidebarItem = ({ icon, text, active = false }) => (
  <a
    href="#"
    className={`flex items-center px-4 py-2 text-sm rounded-lg ${active ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
  >
    <span className="mr-3">{icon}</span>
    {text}
  </a>
)

const StatCard = ({ title, value, change, icon, negative = false }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
        <p className={`text-sm mt-2 ${negative ? 'text-red-600' : 'text-green-600'}`}>
          {change} from last month
        </p>
      </div>
      <div className={`p-3 rounded-full ${negative ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
        {icon}
      </div>
    </div>
  </div>
)

export default AdminDashboard