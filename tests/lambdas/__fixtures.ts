export const mockDeletePhotoRequest = {
  httpMethod: 'DELETE',
  pathParameters: {
    id: 'mock-project-id',
    photoId: 'mock-photo-id'
  }
}

export const mockDeletePhotoResponse = {
  statusCode: 201,
  message: 'Successfully deleted photo mock-photo-id',
  headers: {}
}

export const mockGetPhotoRequest = {
  httpMethod: 'GET',
  pathParameters: {
    id: 'mock-project-id',
    photoId: 'mock-photo-id'
  }
}

export const mockGetPhotoResponse = {
  statusCode: 200,
  message: 'Successfully received photo mock-photo-id',
  body: {
    location: 'tbd'
  },
  headers: {}
}

export const mockCreateProjectRequest = {
  httpMethod: 'POST',
  pathParameters: {
    id: 'mock-project-id',
    photoId: 'mock-photo-id'
  },
  body: {
    name: 'mock-project-name',
    date: 'mock-date',
    files: ['mock-file-1', 'mock-file-2']
  }
}

export const mockCreateProjectResponse = {
  statusCode: 201,
  message: 'Successfully created project mock-project-name',
  headers: {}
}

export const mockDeleteProjectRequest = {
  httpMethod: 'DELETE',
  pathParameters: {
    id: 'mock-project-id'
  }
}

export const mockDeleteProjectResponse = {
  statusCode: 201,
  message: 'Successfully deleted project mock-project-id',
  headers: {}
}

export const mockGetProjectRequest = {
  httpMethod: 'GET',
  pathParameters: {
    id: 'mock-project-id'
  }
}

export const mockGetProjectResponse = {
  statusCode: 201,
  message: 'Successfully retrieved project details for mock-project-id',
  body: {
    projectId: 'mock-project-id',
    files: []
  },
  headers: {}
}

export const mockUpdateProjectRequest = {
  httpMethod: 'PUT',
  pathParameters: {
    id: 'mock-project-id'
  }
}

export const mockUpdateProjectResponse = {
  statusCode: 201,
  message: 'Successfully updated project details for mock-project-id',
  headers: {}
}
