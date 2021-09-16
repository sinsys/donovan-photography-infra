export const mockDeletePhotoRequest = {
  httpMethod: 'DELETE',
  pathParameters: {
    id: 'mock-project-id',
    photoId: 'mock-photo-id',
  },
}

export const mockDeletePhotoResponse = {
  statusCode: 201,
  body: JSON.stringify('Successfully deleted photo mock-photo-id'),
  headers: {},
  isBase64Encoded: false,
}

export const mockGetPhotoRequest = {
  httpMethod: 'GET',
  pathParameters: {
    id: 'mock-project-id',
    photoId: 'mock-photo-id',
  },
}

export const mockGetPhotoResponse = {
  statusCode: 200,
  body: JSON.stringify({
    photoId: 'mock-photo-id',
    projectId: 'mock-project-id',
    location: 's3://someplace',
  }),
  headers: {},
  isBase64Encoded: false,
}

export const mockCreateProjectRequest = {
  httpMethod: 'POST',
  pathParameters: {
    id: 'mock-project-id',
    photoId: 'mock-photo-id',
  },
  body: {
    name: 'mock-project-name',
    date: 'mock-date',
    files: ['mock-file-1', 'mock-file-2'],
  },
}

export const mockCreateProjectResponse = {
  statusCode: 201,
  body: JSON.stringify('Successfully created project mock-project-name'),
  headers: {},
  isBase64Encoded: false,
}

export const mockDeleteProjectRequest = {
  httpMethod: 'DELETE',
  pathParameters: {
    id: 'mock-project-id',
  },
}

export const mockDeleteProjectResponse = {
  statusCode: 201,
  body: JSON.stringify('Successfully deleted project mock-project-id'),
  headers: {},
  isBase64Encoded: false,
}

export const mockGetProjectRequest = {
  httpMethod: 'GET',
  pathParameters: {
    id: 'mock-project-id',
  },
}

export const mockGetProjectResponse = {
  statusCode: 201,
  body: JSON.stringify({
    projectId: 'mock-project-id',
    files: [],
  }),
  headers: {},
  isBase64Encoded: false,
}

export const mockUpdateProjectRequest = {
  httpMethod: 'PUT',
  pathParameters: {
    id: 'mock-project-id',
  },
}

export const mockUpdateProjectResponse = {
  statusCode: 201,
  body: JSON.stringify(
    'Successfully updated project details for mock-project-id'
  ),
  headers: {},
  isBase64Encoded: false,
}
