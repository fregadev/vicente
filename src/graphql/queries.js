/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAssistedPerson = `query GetAssistedPerson($id: ID!) {
  getAssistedPerson(id: $id) {
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
export const listAssistedPersons = `query ListAssistedPersons(
  $filter: ModelAssistedPersonFilterInput
  $limit: Int
  $nextToken: String
) {
  listAssistedPersons(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getVisitRecord = `query GetVisitRecord($id: ID!) {
  getVisitRecord(id: $id) {
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
export const listVisitRecords = `query ListVisitRecords(
  $filter: ModelVisitRecordFilterInput
  $limit: Int
  $nextToken: String
) {
  listVisitRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
