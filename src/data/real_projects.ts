// Map the 21 uploaded RealPic images to categories and titles
// User can edit this file to correct titles and categories

export interface Project {
    id: string;
    title: string;
    category: string;
    categoryLabel: string;
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
        categoryLabel: '展示空間',
        image: '/allrange.tw/images/projects/cmp/cmp-main.png',
        description: 'Exhibition area design planning and construction for CMP Cast Iron Factory.',
        videoUrl: 'ho8GsEHTTN4',
        gallery: [
            '/allrange.tw/images/projects/cmp/cmp-1.png',
            '/allrange.tw/images/projects/cmp/cmp-2.png',
            '/allrange.tw/images/projects/cmp/cmp-3.png'
        ]
    },
    // 1. 文建會於 101-89F 觀景台站高高看台灣地方文物展
    {
        id: 'real-01',
        title: '文建會於 101-89F 觀景台站高高看台灣地方文物展',
        category: 'exhibition',
        categoryLabel: '主題展覽',
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
        categoryLabel: '景觀規劃',
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
        categoryLabel: '辦公空間',
        image: '/allrange.tw/images/projects/itri/itri-main.png',
        description: 'Design for ITRI Biomedical Technology and Device Research Laboratories at Zhubei Biomedical Science Park.',
        gallery: [
            '/allrange.tw/images/projects/itri/itri-1.png',
            '/allrange.tw/images/projects/itri/itri-2.png',
            '/allrange.tw/images/projects/itri/itri-3.png'
        ]
    },
    // 4. 水設國際集團形象設計
    {
        id: 'real-shuei',
        title: '水設國際集團形象設計',
        category: 'graphic',
        categoryLabel: '品牌形象',
        image: '/allrange.tw/images/projects/shuei-design/main.png',
        description: 'Corporate Identity Design for Shuei Design International Conglomerate.',
    },
    // 5. 莉蒂亞文教機構
    {
        id: 'real-lydia',
        title: '莉蒂亞文教機構',
        category: 'graphic',
        categoryLabel: '品牌溝通',
        image: '/allrange.tw/images/projects/lydia-edu/main.png',
        description: 'Branding and communication materials for Lydia Educational Institute.',
        gallery: [
            '/allrange.tw/images/projects/lydia-edu/sub1.png'
        ]
    },
    // 6. 好吃客團購
    {
        id: 'real-tasty',
        title: '好吃客團購',
        category: 'graphic',
        categoryLabel: '品牌插畫',
        image: '/allrange.tw/images/projects/tasty-house/main.png',
        description: 'Brand illustration and graphic design for Tasty House Group Buy.',
    },
    // 7. 寶璣系統股份有限公司 展覽設計
    {
        id: 'real-accudevice',
        title: '寶璣系統股份有限公司 展覽設計',
        category: 'exhibition',
        categoryLabel: '展位設計',
        image: '/allrange.tw/images/projects/accudevice/main.jpg',
        description: 'Exhibition booth design for AccuDevice Systems Co., Ltd.',
    },
    // 8. 京和空間照明名片設計
    {
        id: 'real-jinhe',
        title: '京和空間照明名片設計',
        category: 'graphic',
        categoryLabel: '品牌識別',
        image: '/allrange.tw/images/projects/shuei-design/main.png', // Fallback to a clean design image
        description: 'Business card and identity design for Jinhe Space Lighting.',
    },
    // 9. 新福源花生展示空間
    {
        id: 'real-peanut',
        title: '新福源花生展示空間',
        category: 'space',
        categoryLabel: '商業空間',
        image: '/allrange.tw/images/projects/hsin-fu-yuan-peanut/main.png',
        description: 'Commercial space and exhibition design for Hsin Fu Yuan Peanuts.',
    }
];

export const heroImages = realProjects.map(p => p.image);

// Include select projects in hero subset
export const heroSubset = realProjects;
