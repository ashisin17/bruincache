import React from "react";
import "./profile.css";
// import header that chana will work on
// if I have time, make it so we can't shrink screen smaller than the name text

import ProfileResultItem from "./ProfileResultItem"
import ProfileFindItem from "./ProfileFindItem"

import { useRef, useEffect } from "react";
import { State, useState } from "react";
import { getFirestore, collection, getDocs, addDoc, doc, query, where } from 'firebase/firestore/lite';
import app from "../firebase"
import CachePopup from "./CachePopup"


const db = getFirestore(app);


function Profile ( props ) {

    const [ownedCaches, setOwnedCaches] = useState([]);
	
	const [ownedFinds, setOwnedFinds] = useState([]);
	const [loadedC, setLoadedC] = useState(false);
	const [loadedF, setLoadedF] = useState(false);

    async function search_caches() {
		
			const results = [];
			const q = query(collection(db, "caches"), where("owner", "==", props.user.email));
			const querySnapshot = await getDocs(q);
			//console.log(querySnapshot); //
			querySnapshot.forEach((doc) => {
			  // doc.data() is never undefined for query doc snapshots
			  //console.log(doc.id, " => ", doc.data().name); //
			  results.push(doc);
			});
			setOwnedCaches(results);
			
    }
	async function search_finds() {
		
			const results = [];
			const q = query(collection(db, "reviews"), where("owner", "==", props.user.email));
			const querySnapshot = await getDocs(q);
			//console.log(querySnapshot); //
			querySnapshot.forEach((doc) => {
			  // doc.data() is never undefined for query doc snapshots
			  //console.log(doc.id, " => ", doc.data().name); //
			  results.push(doc);
			});
			setOwnedFinds(results);
			
    }
	if(!loadedC) {
		setLoadedC(true);
		search_caches();
		//console.log(ownedCaches);
		//console.log("DONE");
		//ownedCaches.map((result) => console.log(result));
	}
	if(!loadedF) {
		setLoadedF(true);
		search_finds();
		console.log(ownedFinds);
		//console.log("DONE");
		//ownedCaches.map((result) => console.log(result));
	}
	
	function list_finds() {
		if(ownedFinds.length > 0) {
			return (<>
				<ul>
					{ownedFinds.length > 0 &&
					  ownedFinds.map((result) => <ProfileFindItem res={result} key={result.id} />)}
				</ul>
				</>
			)
		}
		else {
			return(
			<div class="finds-text">Go out and find some caches!</div>
			)
		}
			
				
	}
	
	function list_caches() {
		if(ownedCaches.length > 0) {
			return (<>
				<ul>
					{ownedCaches.length > 0 &&
					  ownedCaches.map((result) => <ProfileResultItem res={result} key={result.id} />)}
				</ul>
				</>
			)
		}
		else {
			return(
			<div class="finds-text">Go make some caches!</div>
			)
		}
			
				
	}
	
	
    return (
        <>
            <div class="background-rectangle"></div>

            <div class="profile">
                <svg width="200" height="200" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M42 48C45.9782 48 49.7936 46.4196 52.6066 43.6066C55.4196 40.7936 57 36.9782 57 33C57 29.0218 55.4196 25.2064 52.6066 22.3934C49.7936 19.5804 45.9782 18 42 18C38.0218 18 34.2064 19.5804 31.3934 22.3934C28.5804 25.2064 27 29.0218 27 33C27 36.9782 28.5804 40.7936 31.3934 43.6066C34.2064 46.4196 38.0218 48 42 48ZM42 44.25C43.4774 44.25 44.9403 43.959 46.3052 43.3936C47.6701 42.8283 48.9103 41.9996 49.955 40.955C50.9996 39.9103 51.8283 38.6701 52.3936 37.3052C52.959 35.9403 53.25 34.4774 53.25 33C53.25 31.5226 52.959 30.0597 52.3936 28.6948C51.8283 27.3299 50.9996 26.0897 49.955 25.045C48.9103 24.0004 47.6701 23.1717 46.3052 22.6064C44.9403 22.041 43.4774 21.75 42 21.75C39.0163 21.75 36.1548 22.9353 34.045 25.045C31.9353 27.1548 30.75 30.0163 30.75 33C30.75 35.9837 31.9353 38.8452 34.045 40.955C36.1548 43.0647 39.0163 44.25 42 44.25Z" fill="#3AAFA9"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M79 42.5C79 62.0607 62.0607 79.5 42.5 79.5C22.9394 79.5 6 62.0607 6 42.5C6 22.9394 22.9394 6 42.5 6C62.0607 6 79 22.9394 79 42.5ZM59.5532 69.4344C54.4549 72.6708 48.5388 74.3848 42.5 74.375C36.3165 74.385 30.2649 72.5877 25.0892 69.2042C24.6642 68.673 24.2339 68.124 23.7965 67.5573C23.291 66.8932 23.0184 66.081 23.0209 65.2464C23.0209 63.3392 24.3915 61.7401 26.2243 61.4727C38.3457 59.7019 46.6916 59.8542 58.8289 61.5347C59.7079 61.6621 60.5111 62.1033 61.0901 62.7768C61.6692 63.4502 61.985 64.3104 61.9792 65.1986C61.9792 66.0486 61.687 66.8738 61.1593 67.5184C60.6157 68.1807 60.0791 68.8199 59.5532 69.4344ZM65.4943 64.5752C65.211 61.2602 63.3805 57.4675 60 57C47.5758 55.2805 37.5824 55.1743 25.0892 57C21.6892 57.4958 19.8068 61.2549 19.5093 64.5788C13.799 58.6484 10.6138 50.7328 10.625 42.5C10.625 24.8962 24.8962 10.625 42.5 10.625C60.1039 10.625 74.375 24.8962 74.375 42.5C74.3863 50.731 71.2025 58.6452 65.4943 64.5752Z" fill="#3AAFA9"/>
                </svg>
                <div class="profile-name">{props.user.displayName} </div>
                <div class="profile-email">{props.user.email}</div>
            </div>

            <div class="finds">
                <div class="finds-box"></div>
                <div class="finds-icon">
                    <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.2939 20.025C26.5751 20.1297 24.1173 21.1 22.8032 22.4156C22.6581 22.5607 22.4857 22.6758 22.2961 22.7542C22.1065 22.8327 21.9032 22.8731 21.698 22.873C21.4928 22.8729 21.2896 22.8324 21.1 22.7538C20.9104 22.6752 20.7382 22.56 20.5931 22.4149C20.448 22.2697 20.333 22.0974 20.2545 21.9077C20.176 21.7181 20.1357 21.5148 20.1357 21.3096C20.1358 21.1044 20.1763 20.9012 20.2549 20.7116C20.3335 20.522 20.4487 20.3498 20.5939 20.2047C22.6204 18.1781 25.9204 17.0281 29.172 16.9016C32.4454 16.775 36.0189 17.6703 38.522 20.1734C38.815 20.4666 38.9795 20.8642 38.9793 21.2787C38.9792 21.6932 38.8144 22.0906 38.5212 22.3836C38.228 22.6766 37.8305 22.8411 37.416 22.841C37.0015 22.8408 36.604 22.676 36.3111 22.3828C34.6079 20.6781 31.9923 19.9188 29.2939 20.0234V20.025Z" fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M42.7875 45.2125C39.1263 48.3107 34.4836 50.0074 29.6875 50C18.4688 50 9.375 40.9062 9.375 29.6875C9.375 18.4688 18.4688 9.375 29.6875 9.375C40.9062 9.375 50 18.4688 50 29.6875C50 34.6797 48.2 39.25 45.2125 42.7875L48.6625 42.1875L64.7313 58.2563C65.9234 59.4484 65.9234 61.3813 64.7313 62.5719L62.5719 64.7313C61.3797 65.9234 59.4469 65.9234 58.2563 64.7313L42.1875 48.6625L42.7875 45.2125ZM46.875 29.6875C46.875 39.1797 39.1797 46.875 29.6875 46.875C20.1953 46.875 12.5 39.1797 12.5 29.6875C12.5 20.1953 20.1953 12.5 29.6875 12.5C39.1797 12.5 46.875 20.1953 46.875 29.6875ZM58.2016 56.1453L47.6 45.5438L45.85 45.8484L45.5438 47.6L56.1766 58.2328L58.2016 56.1453ZM58.3859 60.4422L60.4141 62.4703L62.4703 60.4141L60.4109 58.3547L58.3859 60.4422Z" fill="black"/>
                    </svg>
                </div>
                <div class="view-finds">Your Finds</div>  
				<hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
				{list_finds()}
                
				
            </div>

            <div class="caches">
                <div class="caches-box"></div>
                <div class="caches-icon">
                    <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.25 56.1047H60.7558V20.6759C60.7558 18.4956 59.8837 16.4244 58.3576 14.8983C56.8314 13.3721 54.7602 12.5 52.5799 12.5H14.4259C12.2456 12.5 10.1744 13.3721 8.64826 14.8983C7.12209 16.4244 6.25 18.4956 6.25 20.6759V56.1047ZM55.3052 31.577H41.6788V26.1265H25.327V31.577H11.7006V20.6759C11.7006 19.9673 12.0004 19.3132 12.4909 18.7409C13.0632 18.2504 13.7173 17.9506 14.4259 17.9506H52.5799C53.3158 17.9506 53.9426 18.2504 54.5149 18.7409C55.0327 19.3132 55.3052 19.9673 55.3052 20.6759V31.577ZM41.6788 37.0276H55.3052V50.6541H11.7006V37.0276H25.327L30.7776 42.4782H36.2282L41.6788 37.0276ZM30.7776 31.577H36.2282V37.0276H30.7776V31.577Z" fill="black"/>
                    </svg>
                </div>
                <div class="view-caches">Your Caches</div>  
				<hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/> 
				{list_caches()}
                
            </div>

        </>
    );
};

export default Profile;

