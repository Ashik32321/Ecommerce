import React from 'react';
import TopNavbar from "../PurchaseTopNavbar/TopNavbar";
import PurchaseCategory from "../PurchaseCategories/PurchaseCategory";
import PurchaseAdds from "../PurchaseCategories/PurchaseAdds";
import PurchaseProducts from "../PurchaseProducts/PurchaseProducts";
import PurchaseBottomNavbar from '../PurchaseBottomNavbar/PurchaseBottomNavbar';
import PurchaseFooter from './PurchaseFooter';


function PurchaseHome() {
    return (
        <div>
            <TopNavbar/>
            
            <PurchaseCategory/>
            <PurchaseAdds/>
            <PurchaseProducts/>
            <PurchaseBottomNavbar/>
            <PurchaseFooter/>
            
        </div>
    );
}

export default PurchaseHome;
