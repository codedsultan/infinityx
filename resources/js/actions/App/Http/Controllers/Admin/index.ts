import AdminDashboardController from './AdminDashboardController'
import AdminProjectController from './AdminProjectController'
import AdminContactController from './AdminContactController'

const Admin = {
    AdminDashboardController: Object.assign(AdminDashboardController, AdminDashboardController),
    AdminProjectController: Object.assign(AdminProjectController, AdminProjectController),
    AdminContactController: Object.assign(AdminContactController, AdminContactController),
}

export default Admin