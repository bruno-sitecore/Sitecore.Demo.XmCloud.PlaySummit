import {
  Text,
  Field,
  Image,
  ImageField,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type SEHeaderProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Image: ImageField;
    Body: Field<string>;
    ShowTitleOnHeader: boolean;
  };
};

const SEHeader = (props: SEHeaderProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  const hasHeaderImage = props?.fields?.Image;
  const showTitle = props?.fields?.ShowTitleOnHeader;

  const headerImage = hasHeaderImage && <Image className="logo" field={props.fields.Image} />;
  const title = showTitle && <h1>{props.fields.Title.value}</h1>;

  return (
    <header className={`${sxaStyles}`}>
      {headerImage}
      {title}
      <Text tag="h2" className="" field={props.fields.Title} />
      <Image className="" field={props.fields.Image} />
      <Text tag="p" className="" field={props.fields.Body} />
    </header>
  );
};

export const Default = withDatasourceCheck()<SEHeaderProps>(SEHeader);
