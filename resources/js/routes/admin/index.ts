import projects from './projects'
import contacts from './contacts'

const admin = {
    projects: Object.assign(projects, projects),
    contacts: Object.assign(contacts, contacts),
}

export default admin