export const navItems  = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "About",
        path: "/about"
    },
    {
        title: "FAQs",
        path: "/faqs"
    },
    {
        title: "Contact",
        path: "/contact"
    },
]

interface TestimonialProps{
   id: number;
    name: string;
    text:string;
    img: string;
    delay: number;
}

//https://randomuser.me/api/portraits/men/32.jpg
//https://randomuser.me/api/portraits/women/45.jpg
export const TestimonialData: TestimonialProps[] = [
  {
    id: 1,
    name: "Chinedu O.",
    text: "NaijaEscrow gave my customers the confidence to buy. Payments are secure, and I get paid once orders are delivered. Perfect!",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    delay: 100,
  },
  {
    id: 2,
    name: "Amaka I.",
    text: "I no longer fear scams when shopping online. With NaijaEscrow, my money is safe until I get my item. Highly recommended!",
    img: "https://randomuser.me/api/portraits/women/32.jpg",
    delay: 200,
  },
  {
    id: 3,
    name: "Tunde A.",
    text: "Smooth transactions every time. NaijaEscrow makes my delivery process more reliable for both buyers and sellers.",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
    delay: 300,
  },
  {
    id: 4,
    name: "Ngozi E.",
    text: "It has completely changed how I do business online. Buyers trust me more because they know their funds are protected.",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    delay: 400,
  },
  {
    id: 5,
    name: "Segun B.",
    text: "I deliver services and get paid instantly after client approval. NaijaEscrow protects both sides.",
    img: "https://randomuser.me/api/portraits/men/5.jpg",
    delay: 500,
  },
  {
    id: 6,
    name: "Fatima M.",
    text: "Customers always asked for payment on delivery. Now they use NaijaEscrow and everybody's happy!",
    img: "https://randomuser.me/api/portraits/women/5.jpg",
    delay: 600,
  },
  {
    id: 7,
    name: "Damilola K.",
    text: "NaijaEscrow makes my custom orders stress-free. Funds are secured and released only when my clients confirm delivery.",
    img: "https://randomuser.me/api/portraits/women/6.jpg",
    delay: 700,
  },
  {
    id: 8,
    name: "Ifeanyi C.",
    text: "We sell high-value gadgets. NaijaEscrow adds an extra layer of trust between us and buyers.",
    img: "https://randomuser.me/api/portraits/men/10.jpg",
    delay: 800,
  },
  {
    id: 9,
    name: "Aisha U.",
    text: "Shopping for kids online used to be scary. Now with NaijaEscrow, I know my money is safe.",
    img: "https://randomuser.me/api/portraits/women/30.jpg",
    delay: 900,
  },
  {
    id: 10,
    name: "Bolaji F.",
    text: "I’ve used NaijaEscrow for over 20 deals. It’s easy, fast, and I’ve never had issues with payments.",
    img: "https://randomuser.me/api/portraits/men/20.jpg",
    delay: 1000,
  },
];
