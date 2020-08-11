import React from 'react';
import DashBottomCard from "../Components/DashboardOrgP/DashBottomCard";
import renderer from 'react-test-renderer';

test("Test DashBottomCard Component", ()=>{
  let profile = {
    address: "浪浪別哭(台南店)",
    adoptionstatus: 1,
    date: "2020-08-12",
    gender: "Male",
    id: "sKSHOps2CX27St0d4SKT",
    month: "2",
    name: "阿波",
    orgname: "Taipei Shelter",
    orguid: "xyofYzEJhOhEFObcTZbca1Tnhl03",
    story: "這次的新生，一口氣來了2個年紀只有快兩個月大↵體型比巴掌大一點的小奶娃！↵他們來自彰化的鄉下↵飼主因為沒有節育觀念而讓家中的母狗懷孕生了寶寶，↵愛媽出手救援並且替狗媽媽結了紥↵這二個孩子輾轉之下到了台北浪浪找家↵黑白色的小乳牛，是個膽子大、個性外向的小女孩↵遇到其他體型較大的孩子來邀玩，也勇於奮戰！↵白色北極熊寶寶，是個個性腼腆的男孩，↵對於孩子們的戰鬥，他寧可選擇站在一旁保持自己的優雅, ↵待小乳牛回來後再和她一起過二人世界。",
    timestamp: {seconds: 1596387516, nanoseconds: 955000000},
    url: "https://firebasestorage.googleapis.com/v0/b/adoption-platform.appspot.com/o/images%2F%E9%98%BF%E6%B3%A2.jpg?alt=media&token=5cfd43f4-c3f2-4473-b7b4-bd0011d5bbbf",
    year: "0",
  }
  
  let comp = renderer.create(<DashBottomCard profile={profile} />).toJSON();
	expect(comp).toMatchSnapshot();
	comp = renderer.create(<DashBottomCard profile={{}} />).toJSON();
	expect(comp).toMatchSnapshot();
});