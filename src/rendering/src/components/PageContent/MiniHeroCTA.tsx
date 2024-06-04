import {
  Text,
  Field,
  ImageField,
  Image,
  LinkField,
  Link,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type MiniHeroCTAProps = ComponentProps & {
  fields: {
    title: Field<string>;
    image: ImageField;
    body: Field<string>;
    link: LinkField;
  };
};

const MiniHeroCTA = (props: MiniHeroCTAProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section className={`text-cta ${sxaStyles}`}>
      <div className="">
        <Text tag="h2" className="" field={props.fields.title} />
        <Text tag="p" className="" field={props.fields.body} />
        <Image field={props.fields.image} />
        <Link field={props.fields.link} />
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<MiniHeroCTAProps>(MiniHeroCTA);
