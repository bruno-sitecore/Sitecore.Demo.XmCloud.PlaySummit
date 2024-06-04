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
    Title: Field<string>;
    Image: ImageField;
    Body: Field<string>;
    Link: LinkField;
  };
};

const MiniHeroCTA = (props: MiniHeroCTAProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section className={`text-cta ${sxaStyles}`}>
      <div className="">
        <Text tag="h2" className="" field={props.fields.Title} />
        <Text tag="p" className="" field={props.fields.Body} />
        <Image field={props.fields.Image} />
        <Link field={props.fields.Link} />
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<MiniHeroCTAProps>(MiniHeroCTA);
