import {
  Text,
  Field,
  ImageField,
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
    <section
      className={`sedemo-miniherocta ${sxaStyles}`}
      style={{ backgroundImage: `url(${props.fields.Image.value?.src})` }}
    >
      <div className="hero-grid">
        <div className="grid-col glassy ">
          <Text tag="h2" className="" field={props.fields.Title} />
          <Text tag="p" className="" field={props.fields.Body} />
          <Link className="button-63" field={props.fields.Link} />
        </div>
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<MiniHeroCTAProps>(MiniHeroCTA);
