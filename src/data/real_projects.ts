// Map the 21 uploaded RealPic images to categories and titles
// User can edit this file to correct titles and categories

export const realProjects = [
    // 1. 文建會於 101-89F 觀景台站高高看台灣地方文物展
    {
        id: 'real-01',
        title: '文建會 - 101觀景台地方文物展',
        category: 'exhibition',
        image: '/allrange.tw/images/RealPic/de203caf-cb54-40ba-9054-84825b5299e1-0000.webp',
        description: 'Exhibition of local artifacts at Taipei 101 Observatory (89F).'
    },
    // 2. 勤美鑄鐵廠展區設計專案
    {
        id: 'real-02',
        title: '勤美鑄鐵廠 - 展區設計',
        category: 'exhibition',
        image: '/allrange.tw/images/RealPic/de203caf-cb54-40ba-9054-84825b5299e1-0001.webp',
        description: 'Exhibition area design for CMP Iron Works.'
    },
    // 3. 博鑫醫電
    {
        id: 'real-03',
        title: '博鑫醫電 (Broadsims)',
        category: 'space',
        image: '/allrange.tw/images/RealPic/de203caf-cb54-40ba-9054-84825b5299e1-0002.webp',
        description: 'Office or exhibition space for Broadsims Medical Electronics.'
    },
    // 4. 吉寶托嬰中心
    {
        id: 'real-04',
        title: '吉寶托嬰中心',
        category: 'space',
        image: '/allrange.tw/images/RealPic/de203caf-cb54-40ba-9054-84825b5299e1-0003.webp',
        description: 'Interior design for Ji-Bao Infant Care Center.'
    },
    // 5. 水設室內設計
    {
        id: 'real-05',
        title: '水設室內設計',
        category: 'space',
        image: '/allrange.tw/images/RealPic/de203caf-cb54-40ba-9054-84825b5299e1-0004.webp',
        description: 'Interior design project.'
    },
    // 6. 莉蒂亞教育中心
    {
        id: 'real-06',
        title: '莉蒂亞教育中心',
        category: 'space',
        image: '/allrange.tw/images/RealPic/de203caf-cb54-40ba-9054-84825b5299e1-0005.webp',
        description: 'Educational space planning for Lydia Education Center.'
    },
    // 7. 億鴻系統科技
    {
        id: 'real-07',
        title: '億鴻系統科技',
        category: 'space',
        image: '/allrange.tw/images/RealPic/de203caf-cb54-40ba-9054-84825b5299e1-0006.webp',
        description: 'Corporate space for Yi-Hong System Technology.'
    },
    // 8. 有成精密
    {
        id: 'real-08',
        title: '有成精密',
        category: 'space',
        image: '/allrange.tw/images/RealPic/de203caf-cb54-40ba-9054-84825b5299e1-0007.webp',
        description: 'Industrial or office space for You-Cheng Precision.'
    },
    // 9. 新竹市環保局
    {
        id: 'real-09',
        title: '新竹市環保局',
        category: 'exhibition',
        image: '/allrange.tw/images/RealPic/de203caf-cb54-40ba-9054-84825b5299e1-0008.webp',
        description: 'Project for Hsinchu City Environmental Protection Bureau.'
    },
    // 10. 裕隆汽車裕苗活動園區設計專案
    {
        id: 'real-10',
        title: '裕隆汽車 - 裕苗山丘 台灣原生林復育中心暨活動園區',
        category: 'space',
        image: '/yulon-main.jpg',
        description: 'Design plan for Yulon Miao Hill Taiwan Native Forest Restoration Center and Event Park.'
    },
    // 11. 渴望會館兒童遊戲室
    {
        id: 'real-11',
        title: '渴望會館 - 兒童遊戲室',
        category: 'space',
        image: '/allrange.tw/images/RealPic/de203caf-cb54-40ba-9054-84825b5299e1-0010.webp',
        description: 'Children\'s playroom design for Aspire Resort.'
    },
];

export const heroImages = [
    realProjects[0].image,
    realProjects[1].image,
    realProjects[2].image,
    realProjects[3].image,
    realProjects[4].image,
];

// Subset of images for Hero sections / Menu
export const heroSubset = realProjects.slice(0, 11);
