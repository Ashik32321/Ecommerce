import React from 'react';
import '../PurchaseCssFiles/PurchaseFooter.css'; // Import CSS file

function PurchaseFooter() {
  return (
    <div className='container-fluid bg-white mb-5 footertextsize '>
      <table className='text-center bg-white text-black w-100'>
        <tr>
          <td className='text-start'>
            <p>Developed By</p>
            <ul>ASHIK M I</ul>
            <ul>HRITHIK T G</ul>
            <ul>MANOJ M</ul>
            <ul>RACHAN DEVAIAH M V</ul>
          </td>
          <td className='ms-5'>
            <p >Under The Guidance Of</p>
            Mrs. VEDHASHREE C G
          </td>
          <td className='text-end'>
            <p>Group members</p>
            <ul>ASHIK M I</ul>
            <ul>HRITHIK T G</ul>
            <ul>MANOJ M</ul>
            <ul>RACHAN DEVAIAH M V</ul>
          </td>
        </tr>
      </table>
      <p className='text-center'>All Rights Reserved</p>
    </div>
  );
}

export default PurchaseFooter;
