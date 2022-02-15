import Page from '@/components/page'
import Section from '@/components/section'
import Map, {Layer} from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam9uYXRoYW5zZWdhbCIsImEiOiJjamxrODVuamgwazI0M3BsZHIwNW5xZjNrIn0.UTtfn21uo6LCNkh-Pn1b4A';

const parkLayer = {
	id: 'landuse_park',
	type: 'fill',
	source: 'mapbox',
	'source-layer': 'landuse',
	filter: ['==', 'class', 'park'],
	paint: {
	  'fill-color': '#FFFFFF'
	}
  };

const Index = () => (
	<Page>
			<Map
        initialViewState={{
          latitude: 42.0267061,
          longitude: -93.6489112,
          zoom: 16,
		  pitch: 60
        }}
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
		<Layer {...parkLayer} />
      </Map>
		{/* <Section>
			<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
				We grow a lot of rice.
			</h2>

			<div className='mt-2'>
				<p className='text-zinc-600 dark:text-zinc-400'>
					You love rice, and so does the rest of the world. In the crop year
					2008/2009, the milled rice production volume amounted to over{' '}
					<span className='font-medium text-zinc-900 dark:text-zinc-50'>
						448 million tons
					</span>{' '}
					worldwide.
				</p>

				<br />

				<p className='text-sm text-zinc-600 dark:text-zinc-400'>
					<a
						href='https://github.com/mvllow/next-pwa-template'
						className='underline'
					>
						Source
					</a>
				</p>
			</div>
		</Section> */}
	</Page>
)

export default Index
