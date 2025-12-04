import PortfolioController from './PortfolioController'
import ContactController from './ContactController'
import ProjectController from './ProjectController'
import Admin from './Admin'
import Settings from './Settings'

const Controllers = {
    PortfolioController: Object.assign(PortfolioController, PortfolioController),
    ContactController: Object.assign(ContactController, ContactController),
    ProjectController: Object.assign(ProjectController, ProjectController),
    Admin: Object.assign(Admin, Admin),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers