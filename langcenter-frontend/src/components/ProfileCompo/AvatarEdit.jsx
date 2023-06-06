import React, { useState } from 'react';
import Avatar from 'react-avatar-edit';
import photoProfile from '../../images/user.png'



function Settings() {
  const [ image , setimage] = useState(photoProfile);
  const [dialogs , setdialogs] = useState(false);
  const [imgCrop , setimgCrop] = useState(false);
  const [storeImage , setstoreImage] = useState([]);
  
  const onClose = () => {
    setimgCrop(null)
  }

  const onCrop = (preview) => {
    setimgCrop(preview)
  }
  const saveImage = () =>{
    setstoreImage([...storeImage , {imgCrop}])
   

  }
  const profileImageShow = storeImage.map( item => item.imgCrop)
  
  return (
    <div className='EditAvatar'>
      <img src={profileImageShow.length?profileImageShow :photoProfile} style={{ width: "150px", height: " 150px", borderRadius: "50%" }} />
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Changer Photo de profile
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Photo de profile</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                {image ? (
                  <div>
                    <Avatar
                      width={400}
                      height={300}
                      onCrop={onCrop}
                      onClose={onClose}
                      
                    />
                    
                   
                  </div>
                ) : (
                  <div>
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={saveImage} data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div >

  );
}

export default Settings;