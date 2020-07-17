import paginatorType from './paginator.type';
import userType from './user.type';
import imageType from './image.type';

export default `
  scalar JSON

  ${userType}
  
  
  ${imageType}
  ${paginatorType}
`;
