import 'setimmediate';
import { fileUpload } from '../../helpers/fileUpload';
import cloudinary from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'jarh-workplace', 
  api_key: '549136979557743', 
  api_secret: 'H1GrMxKiabMNmyqZPQjFuR93Fig',
  secure: true
});

describe('Test fileUpload', () => {
  
  test('should load a file and return the url', async () => {
    const resp = await fetch('https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png');
    const blob = await resp.blob();
    
    const file = new File([blob],'photo_test.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    // get publiv_id ===> fileName without extension
    const segments = url.split('/');
    const imageId = segments[ segments.length - 1 ].replace('.png','');
    cloudinary.v2.api.delete_resources(imageId, () => {});
  })
  
  test('should receive null', async () => {
    const file = new File([],'photo_test.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  })

})
