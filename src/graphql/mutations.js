/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAssistedPerson = `mutation CreateAssistedPerson($input: CreateAssistedPersonInput!) {
  createAssistedPerson(input: $input) {
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
`;
export const updateAssistedPerson = `mutation UpdateAssistedPerson($input: UpdateAssistedPersonInput!) {
  updateAssistedPerson(input: $input) {
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
`;
// language=GraphQL
export const deleteAssistedPerson = `mutation DeleteAssistedPerson($input: DeleteAssistedPersonInput!) {
  deleteAssistedPerson(input: $input) {
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
`;
// language=GraphQL
export const createVisitRecord = `mutation CreateVisitRecord($input: CreateVisitRecordInput!) {
  createVisitRecord(input: $input) {
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
`;
export const updateVisitRecord = `mutation UpdateVisitRecord($input: UpdateVisitRecordInput!) {
  updateVisitRecord(input: $input) {
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
`;
export const deleteVisitRecord = `mutation DeleteVisitRecord($input: DeleteVisitRecordInput!) {
  deleteVisitRecord(input: $input) {
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
`;
