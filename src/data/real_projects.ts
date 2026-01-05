// Map the 21 uploaded RealPic images to categories and titles
// User can edit this file to correct titles and categories

export interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    videoUrl?: string; // Optional YouTube ID
    gallery?: string[]; // Array of image paths
}

export const realProjects: Project[] = [
    // 0. 勤美鑄鐵廠
    {
        id: 'real-cmp',
        title: '勤美鑄鐵廠：展示區域設計規畫建置',
        category: 'space',
        image: '/allrange.tw/images/placeholders/exhibition_design_1.png',
        description: 'Exhibition area design planning and construction for CMP Cast Iron Factory.',
        videoUrl: 'ho8GsEHTTN4',
        gallery: [
            '/allrange.tw/images/placeholders/museum_display_1.png',
            '/allrange.tw/images/placeholders/retail_space_1.png'
        ]
    },
    // 1. 文建會於 101-89F 觀景台站高高看台灣地方文物展
    {
        id: 'real-01',
        title: '文建會於 101-89F 觀景台站高高看台灣地方文物展',
        category: 'exhibition',
        image: '/allrange.tw/images/projects/101/101-main.png',
        description: 'Exhibition of local artifacts at Taipei 101 Observatory (89F).',
        gallery: [
            '/allrange.tw/images/projects/101/101-1.png',
            '/allrange.tw/images/projects/101/101-2.png',
            '/allrange.tw/images/projects/101/101-3.jpg'
        ]
    },
    // 2. 裕隆汽車 - 裕苗山丘
    {
        id: 'real-10',
        title: '裕隆汽車 - 裕苗山丘 台灣原生林復育中心暨活動園區',
        category: 'space',
        image: '/allrange.tw/images/projects/yulon/yulon-main.jpg',
        description: 'Design plan for Yulon Miao Hill Taiwan Native Forest Restoration Center and Event Park.',
        gallery: [
            '/allrange.tw/images/projects/yulon/yulon-1.png',
            '/allrange.tw/images/projects/yulon/yulon-2.png'
        ]
    },
    // 3. 工研院生醫與醫材研究所
    {
        id: 'real-03',
        title: '工研院生醫與醫材研究所 ： 竹北生醫園區',
        category: 'space',
        image: '/allrange.tw/images/projects/itri/itri-main.png',
        description: 'Design for ITRI Biomedical Technology and Device Research Laboratories at Zhubei Biomedical Science Park.',
        gallery: [
            '/allrange.tw/images/projects/itri/itri-1.png',
            '/allrange.tw/images/projects/itri/itri-2.png',
            '/allrange.tw/images/projects/itri/itri-3.png'
        ]
    },
];

export const heroImages = realProjects.map(p => p.image);

// Subset excludes CMP since images don't exist yet
export const heroSubset = realProjects.filter(p => p.id !== 'real-cmp');

