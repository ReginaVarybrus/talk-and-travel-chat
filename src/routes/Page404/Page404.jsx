import { Link } from 'react-router-dom';
import GlobeIcon from '@/images/iconComponents/GlobeIcon';
import StarIcon from '@/images/iconComponents/StarIcon';
import TelegramIcon from '@/images/iconComponents/TelegramIcon';
import TailTelegramIcon from '@/images/iconComponents/TailTelegramIcon';
import {
  Container,
  ContentBox,
  Globe,
  Star,
  TelegramBox,
} from './Page404Styled';

const Page404 = () => (
  <Container>
    <ContentBox>
      <h1>404</h1>
      <h3>Looks like this page doesn&apos;t exist!</h3>
      <p>Go back to home and continue exploring.</p>
      <Link to="/">Go to homepage</Link>
    </ContentBox>
    <Globe>
      <GlobeIcon $fillColor="var(--color-blue-2)" />
    </Globe>
    <Star>
      <StarIcon $fillColor="var(--color-blue-2)" />
    </Star>
    <TelegramBox>
      <TelegramIcon $fillColor="var(--color-blue-2)" />
      <TailTelegramIcon $fillColor="var(--color-blue-2)" />
    </TelegramBox>
  </Container>
);

export default Page404;
