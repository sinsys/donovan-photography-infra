export const mockDeletePhotoRequest = {
  id: 'mock-project-id',
  photoId: 'mock-photo-id'
}

export const mockDeletePhotoResponse = {
  code: 201,
  message: 'Successfully deleted photo mock-photo-id'
}

export const mockGetPhotoRequest = {
  id: 'mock-project-id',
  photoId: 'mock-photo-id'
}

export const mockGetPhotoResponse = {
  code: 200,
  message: 'Successfully received photo mock-photo-id',
  data: {
    location: 'tbd'
  }
}

export const mockCreateProjectRequest = {
  name: 'mock-project-name',
  date: 'mock-date',
  files: ['mock-file-1', 'mock-file-2']
}

export const mockCreateProjectResponse = {
  code: 201,
  message: 'Successfully created project mock-project-name'
}

export const mockDeleteProjectRequest = {
  id: 'mock-project-id'
}

export const mockDeleteProjectResponse = {
  code: 201,
  message: 'Successfully deleted project mock-project-id'
}

export const mockGetProjectRequest = {
  id: 'mock-project-id'
}

export const mockGetProjectResponse = {
  code: 201,
  message: 'Successfully retrieved project details for mock-project-id',
  data: {
    projectId: 'mock-project-id',
    files: []
  }
}

export const mockUpdateProjectRequest = {
  id: 'mock-project-id'
}

export const mockUpdateProjectResponse = {
  code: 201,
  message: 'Successfully updated project details for mock-project-id'
}
