import { fileUpload } from '../../helpers/fileUpload';

describe('Test fileUpload', () => {
  
  test('should load a file and return the url', async () => {
    const resp = await fetch('https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png');
    const blob = await resp.blob();
    
    const file = new File([blob],'photo_test.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');
  })
  
  test('should receive null', async () => {
    const file = new File([],'photo_test.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  })

})
