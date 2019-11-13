/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAssistedPerson = `subscription OnCreateAssistedPerson {
  onCreateAssistedPerson {
    id
    name
    address
    status
    birthdate
    visits {
      id
      assistedPerson {
        id
        name
        address
        status
        birthdate
      }
      date
      owner
    }
  }
}
`
export const onUpdateAssistedPerson = `subscription OnUpdateAssistedPerson {
  onUpdateAssistedPerson {
    id
    name
    address
    status
    birthdate
    visits {
      id
      assistedPerson {
        id
        name
        address
        status
        birthdate
      }
      date
      owner
    }
  }
}
`
export const onDeleteAssistedPerson = `subscription OnDeleteAssistedPerson {
  onDeleteAssistedPerson {
    id
    name
    address
    status
    birthdate
    visits {
      id
      assistedPerson {
        id
        name
        address
        status
        birthdate
      }
      date
      owner
    }
  }
}
`
export const onCreateVisitRecord = `subscription OnCreateVisitRecord($owner: String!) {
  onCreateVisitRecord(owner: $owner) {
    id
    assistedPerson {
      id
      name
      address
      status
      birthdate
      visits {
        id
        date
        owner
      }
    }
    date
    owner
  }
}
`
export const onUpdateVisitRecord = `subscription OnUpdateVisitRecord($owner: String!) {
  onUpdateVisitRecord(owner: $owner) {
    id
    assistedPerson {
      id
      name
      address
      status
      birthdate
      visits {
        id
        date
        owner
      }
    }
    date
    owner
  }
}
`
export const onDeleteVisitRecord = `subscription OnDeleteVisitRecord($owner: String!) {
  onDeleteVisitRecord(owner: $owner) {
    id
    assistedPerson {
      id
      name
      address
      status
      birthdate
      visits {
        id
        date
        owner
      }
    }
    date
    owner
  }
}
`
