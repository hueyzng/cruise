import AgentItemTemplate from '../components/agent-item.html'

export default class Agent {
  constructor(raw) {
    this.id = raw.id
    this.os = raw.os
    this.host = raw.host
    this.status = raw.status
    this.ipaddr = raw.ipaddr
    this.path = raw.path
    this.resources = raw.resources
  }

  deleteResource (resource) {
    const index = this.resources.findIndex(r => r === resource)
    if (index === 0 || index) {
      this.resources.splice(index, 1)
    }
  }

  addResources (resources) {
    this.resources.push(...resources)
  }

  render () {
    const AgentDiv = document.createElement('div')
    AgentDiv.innerHTML = AgentItemTemplate
    
    const os = AgentDiv.querySelector('[name=os]')
    const host = AgentDiv.querySelector('[name=host]')
    const status = AgentDiv.querySelector('[name=status]')
    const ipaddr = AgentDiv.querySelector('[name=ipaddr]')
    const path = AgentDiv.querySelector('[name=path]')
    const resources = AgentDiv.querySelector('[name=resources]')
    const btn = AgentDiv.querySelector('.btn.plus')

    os.classList.add(this.os)
    host.innerHTML = this.host
    status.innerHTML = this.status
    status.classList.add(this.status)
    ipaddr.innerHTML = this.ipaddr
    path.innerHTML = this.path
    btn.setAttribute('data-id', this.id)
    
    let resourcesHTML = ''
    this.resources.forEach(r => {
      resourcesHTML += `
      <div class="resource" name="resource">
        <span class="name">${r}</span>
        <i class="icon-trash" onclick="AgentCtrl.deleteResource(${this.id}, '${r}')"></i>
      </div>`
    })
    resources.innerHTML = resourcesHTML

    return AgentDiv
  }
}