
import ScrollExpand from '@/components/ScrollExpand';
import SpecularButton from '@/components/SpecularButton';
function App() {

  return (
    <>
      <ScrollExpand
  src="/hero.jpg"
  alt="Product hero"
  title="Built to scale"
  scrollHint="Scroll inside the frame"
  useWindowScroll
>
  <h2 className='text-white'>Every pixel, everywhere</h2>
  <p className='text-white'>The frame opens up as you scroll and hands the whole stage to your media.</p>

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
  onClick={() => console.log('clicked')}
>
  Get Started
</SpecularButton>
</ScrollExpand>



    </>
  )
}

export default App
