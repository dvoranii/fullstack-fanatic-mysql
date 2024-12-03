import{d as s,c as _,L as I,r as n,U as F,f,j as t,H as A,T as L,b as N,S}from"./index-BcVzZ_lP.js";import{a as T,P as W,A as q,F as z}from"./cartUtils-_ZXIlvl1.js";const E=s.div.withConfig({displayName:"BlogsPagestyled__BlogList",componentId:"sc-13mk7le-0"})(["display:grid;row-gap:1.2rem;position:relative;user-select:none;padding:0px 20px;.squares-and-triangles{position:absolute;z-index:-1;width:15vw;right:-22%;}"]),M=s.div.withConfig({displayName:"BlogsPagestyled__BlogPageWrapper",componentId:"sc-13mk7le-1"})(["max-width:1400px;margin:0 auto;padding-bottom:4.6rem;"]),U=s.div.withConfig({displayName:"BlogsPagestyled__BlogItem",componentId:"sc-13mk7le-2"})(["display:flex;justify-content:space-between;padding:20px;border:1px solid #ddd;border-radius:5px;background:#fff;@media screen and (max-width:768px){flex-direction:column;width:93vw;margin:0 auto;}"]),D=s(I).withConfig({displayName:"BlogsPagestyled__BlogContent",componentId:"sc-13mk7le-3"})(["display:block;text-decoration:none;color:inherit;flex-grow:1;padding-left:1.2rem;h2{margin:0 0 10px 0;font-size:1.5rem;}p{margin:0;font-size:1rem;color:#666;max-width:80%;}@media screen and (max-width:768px){h2{padding-top:1.2rem;}}"]),O=s.div.withConfig({displayName:"BlogsPagestyled__BlogActions",componentId:"sc-13mk7le-4"})(["display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between;min-width:60px;@media screen and (max-width:768px){flex-direction:row;justify-content:flex-end;gap:1.2rem;padding-top:1.2rem;}"]),H=s.div.withConfig({displayName:"BlogsPagestyled__FreeBadge",componentId:"sc-13mk7le-5"})(["background:linear-gradient( 315deg,rgba(34,185,50,1) 23%,rgba(157,233,165,1) 50%,rgba(34,185,50,1) 77% );border:1px;border-radius:5px;font-size:0.9rem;clip-path:polygon(0 0,100% 0,85% 48%,100% 100%,0 100%,15% 50%);display:flex;justify-content:center;align-items:center;width:80px;height:30px;p{color:white;text-shadow:1px 1px 0 black,-1px 1px 0 black,1px -1px 0 black,-1px -1px 0 black;font-weight:bold;letter-spacing:2px;font-size:1rem;}"]),R=s.div.withConfig({shouldForwardProp:o=>o!=="hasAccess"}).withConfig({displayName:"BlogsPagestyled__PremiumBadge",componentId:"sc-13mk7le-6"})(["background:",';color:white;padding:5px 10px;border-radius:5px;font-size:0.9rem;display:flex;align-items:center;p{font-family:"Alata",sans-serif;text-transform:uppercase;font-size:1rem;color:',";text-shadow:1px 1px 0 black,-1px 1px 0 black,1px -1px 0 black,-1px -1px 0 black;letter-spacing:1px;margin:0;}img{width:20px;height:20px;margin-left:5px;}"],o=>o.hasAccess?"linear-gradient(315deg, rgba(34, 185, 50, 1) 23%, rgba(157, 233, 165, 1) 50%, rgba(34, 185, 50, 1) 77%)":"linear-gradient(180deg, rgba(255, 175, 43, 1) 10%, rgba(255, 222, 166, 1) 50%, rgba(255, 175, 43, 1) 83%)",_.white),c=s.div.withConfig({displayName:"BlogsPagestyled__BlogImgWrapper",componentId:"sc-13mk7le-7"})(["display:flex;align-items:center;background-color:#efefef;user-select:none;img{max-width:100px;padding:10px;}@media screen and (max-width:768px){img{max-width:110px;padding:20px 20px;}}"]),K=s.div.withConfig({displayName:"BlogsPagestyled__SeeMoreButtonWrapper",componentId:"sc-13mk7le-8"})(["text-align:center;margin-top:20px;user-select:none;button{background-color:#007bff;color:white;padding:10px 20px;border:none;cursor:pointer;font-size:16px;border-radius:4px;&:hover{background-color:#0056b3;}}"]),V=s.div.withConfig({displayName:"BlogsPagestyled__BottomButtonsWrapper",componentId:"sc-13mk7le-9"})(["display:flex;align-items:center;gap:1.2rem;"]),Z=s.div.withConfig({displayName:"BlogsPagestyled__PremiumBlogThumbnailWrapperOuter",componentId:"sc-13mk7le-10"})(["cursor:not-allowed;&:hover{cursor:not-allowed;}","{cursor:not-allowed;}"],c),$="/assets/unlocked-DLWpoKZj.png",Q=()=>{const{profile:o,favouriteBlogs:B=[],toggleFavourite:w=()=>{},cartItems:y=[],addItemToCart:k=()=>{},purchasedItems:r=[]}=n.useContext(F)||{};console.log(r);const[p,m]=n.useState(4),[g,j]=n.useState("");n.useEffect(()=>{m(4)},[g]);const b=()=>{m(e=>e+4)},x=f.filter(e=>e.title.toLowerCase().includes(g.toLowerCase())),d=e=>{var i;return r.some(a=>a.product_id===e&&a.product_type==="blog")||(o==null?void 0:o.isPremium)||!((i=f.find(a=>a.id===e))!=null&&i.isPremium)},P=e=>y.some(i=>i.id===e),u=e=>r.some(i=>i.product_id===e&&i.product_type==="blog");return t.jsxs(t.Fragment,{children:[t.jsxs(A,{children:[t.jsx("title",{children:"Blogs - Full Stack Fanatic"}),t.jsx("meta",{name:"description",content:"Full Stack Fanatic Blogs Page."})]}),t.jsxs(M,{children:[t.jsx(L,{textContent:"Blogs"}),t.jsxs(E,{children:[t.jsx(N,{paddingLeft:"0",onChange:e=>j(e)}),t.jsx("img",{src:S,className:"squares-and-triangles",alt:""}),x.slice(0,p).map(e=>{const i=e.isPremium&&!d(e.id),a=d(e.id),C=P(e.id),v=u(e.id),h=T(e);return h.isPurchased=v,t.jsxs(U,{children:[i?t.jsx(Z,{children:t.jsx(c,{children:t.jsx("img",{src:e.image,alt:e.title,title:e.title})})}):t.jsx(c,{children:t.jsx("img",{src:e.image,alt:e.title,title:e.title})}),t.jsxs(D,{to:i?"#":`/blog/${e.id}`,style:{cursor:i?"not-allowed":"pointer"},onClick:l=>{i&&l.preventDefault()},children:[t.jsx("h2",{children:e.title}),t.jsx("p",{children:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam ab, voluptatibus quia ea cum adipisci fuga exercitationem, voluptatum eos nobis esse odio molestias distinctio quibusdam! Optio veniam quae repellat itaque."})]}),t.jsxs(O,{children:[e.isPremium===!1?t.jsx(H,{children:t.jsx("p",{children:"FREE"})}):t.jsxs(R,{hasAccess:a,children:[t.jsx("p",{children:"Premium"}),d(e.id)?t.jsx("img",{src:$,alt:"Unlocked"}):t.jsx("img",{src:W,alt:"Locked"})]}),t.jsxs(V,{children:[e.availableForPurchase&&o&&!u(e.id)&&t.jsx(q,{item:h,alreadyInCart:C,isAccessible:a&&e.isPremium,onAddToCart:k}),o&&t.jsx(z,{isFavourited:B.some(l=>l.id===e.id),onClick:()=>w(e.id,"blog"),altText:"Blog Favourite Button",isDisabled:i})]})]})]},e.id)})]}),p<x.length&&t.jsx(K,{children:t.jsx("button",{onClick:b,children:"See More Blogs"})})]})]})};export{Q as default};
