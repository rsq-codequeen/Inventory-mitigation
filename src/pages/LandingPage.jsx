import ScrollExpand from '@/components/ScrollExpand';
import SpecularButton from '@/components/SpecularButton';
import { Link } from 'react-router-dom';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19V5" />
    <path d="M4 19h16" />
    <path d="M7 15l3-4 3 2 5-7" />
  </svg>
);

const TagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 12l-8 8-8-8V4h8l8 8z" />
    <circle cx="9" cy="9" r="1.5" />
  </svg>
);

const BarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 19V9" />
    <path d="M12 19V5" />
    <path d="M19 19v-7" />
  </svg>
);

function LandingPage() {


  return (
    <>
      <ScrollExpand
        src="/hero.jpg"
        alt="Product hero"
        title="your inventory"
        titleSize={48}
        scrollHint="Scroll inside the frame"
        useWindowScroll
      >
        <h2 className='px-4 text-xl font-bold text-white sm:text-2xl'>Every pixel, everywhere</h2>
        <p className='max-w-xl px-5 text-center text-sm text-white/90 sm:text-base'>The frame opens up as you scroll and hands the whole stage to your media.</p>

        <div className='landing-actions mt-6 flex w-full flex-col gap-3 px-5 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-nowrap sm:justify-center sm:gap-4 sm:px-0'>
          <SpecularButton
            size="lg"
            radius={18}
            tint="#ffffff"
            tintOpacity={0}
            blur={0}
            textColor="#f5f5f5"
            lineColor="#ffffff"
            baseColor="#525252"
            intensity={1}
            shineSize={10}
            shineFade={40}
            thickness={1}
            speed={0.35}
            followMouse
            proximity={250}
            autoAnimate={false}
            icon={<ArrowIcon />}
            className="w-full sm:w-auto"
        
          >
            <Link to="/enter-stock"> Enter Stock</Link>
           
          </SpecularButton>

          <SpecularButton
            size="lg"
            radius={18}
            tint="#ffffff"
            tintOpacity={0}
            blur={0}
            textColor="#f5f5f5"
            lineColor="#ffffff"
            baseColor="#525252"
            intensity={1}
            shineSize={10}
            shineFade={40}
            thickness={1}
            speed={0.35}
            followMouse
            proximity={250}
            autoAnimate={false}
            icon={<ChartIcon />}
            onClick={() => console.log('clicked')}
            className="w-full sm:w-auto"
          >
            <Link to="/dashboard">Dashboard</Link>
            
          </SpecularButton>

          <SpecularButton
            size="lg"
            radius={18}
            tint="#ffffff"
            tintOpacity={0}
            blur={0}
            textColor="#f5f5f5"
            lineColor="#ffffff"
            baseColor="#525252"
            intensity={1}
            shineSize={10}
            shineFade={40}
            thickness={1}
            speed={0.35}
            followMouse
            proximity={250}
            autoAnimate={false}
            icon={<TagIcon />}
            className="w-full sm:w-auto"
            
          >
            <Link to="/discount">Discount</Link>
            
          </SpecularButton>

          <SpecularButton
            size="lg"
            radius={18}
            tint="#ffffff"
            tintOpacity={0}
            blur={0}
            textColor="#f5f5f5"
            lineColor="#ffffff"
            baseColor="#525252"
            intensity={1}
            shineSize={10}
            shineFade={40}
            thickness={1}
            speed={0.35}
            followMouse
            proximity={250}
            autoAnimate={false}
            icon={<BarIcon />}
            onClick={() => console.log('clicked')}
            className="w-full sm:w-auto"
          >
             <Link to="/analytics">Analytics</Link>
            
          </SpecularButton>
        </div>
      </ScrollExpand>
    </>
  );
}

export default LandingPage;