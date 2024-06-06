import {
  Text,
  Field,
  Image,
  ImageField,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type BrunoTestProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Image: ImageField;
    Body: Field<string>;
  };
};

const BrunoTest = (props: BrunoTestProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section className={`sedemo-brunotest ${sxaStyles}`}>
      <Text tag="h2" className="" field={props.fields.Title} />
      <Image tag="p" className="" field={props.fields.Image} />
      <Text tag="p" className="" field={props.fields.Body} />
    </section>
  );
};

export const Default = withDatasourceCheck()<BrunoTestProps>(BrunoTest);
