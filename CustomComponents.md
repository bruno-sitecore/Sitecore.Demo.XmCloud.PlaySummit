# Walkthrough: Building an SXA Component for Play Summit

This guide provides a basic outline of building a headless SXA component from scratch in the _Play! Summit_ solution. This is _not_ the same as cloning an existing SXA component.

You should have the following:

* an XM Cloud environment
* a copy/fork of the [**Sitecore.Demo.XMCloud.PlaySummit**](https://github.com/Sitecore/Sitecore.Demo.XmCloud.PlaySummit) repo hooked up to the above XMC environment
* a `.env.local` file in solution that points to the Preview endpoint of the above XMC environment (see File References section below)

It is recommended that you make these changes to a non-critical XM Cloud environment (i.e. one not used for regular demoes).

**These instructions are for cloud-first development**. All configuration changes will happen in your remote XM Cloud instance, _not_ a local XMC Docker instance.

### 1) Create Data Template

Add a new data template under: `/sitecore/templates/Project/Global`

* If you create a subfolder, be sure to use that same folder throughout the rest of these steps

Add the fields/datatypes that your component requires.

### 2) Create Datasource Folder

Add a new _Folder_ under: `/sitecore/content/PLAY/playwebsite/Data`

* Update the **icon** to something distinct (optional).
* Configure **Insert Options** to use the data template created in Step 1.

### 3) Create Rendering Definition Item

Add a new `Json Rendering` under: `/sitecore/layout/Renderings/Project/PLAY`

Configure the following fields on the new rendering definition item:

* **Parameters Template**: `Templates/Project/PLAY/Rendering Parameters/PLAY Styling`
* **Datasource Location**: the folder path created in Step 2
* **Datasource Template**: path to the template created in Step 1

### 4) Write Component Code in Solution

Create the following two files in the `Sitecore.Demo.XMCloud.PlaySummit` repo:

* `\src\rendering\src\components\<FOLDER>\<COMPONENT NAME>.tsx`

  * Use an existing folder or create one that matches the conventions you used in the Sitecore content tree

* `\src\rendering\src\assets\css\components\<FOLDER>\<COMPONENT NAME>.css`

  * Use a consistent folder and component name as above

Implement the Next.js/React component and necessary styling.

### 5) Commit Code to Repo + Deploy

Commit your code changes and push to GitHub. If needed, trigger a deployment to your XM Cloud environment.

Add your new component to a test page. From here on out, you can tweak the component locally without having to push more code.

### 6) Local Development

In a terminal, navigate to the following folder of your solution: `\src\rendering\`

* Run a build to register the new component: `npm run build`
* Start the local Next server: `npm run next:dev`

Open a browser and navigate to **https://localhost:3000**. You should see the _Play! Summit_ website rendered.

Navigate to the test page you created in XM Cloud. You should see the markup for your component.

### 7) Tweak Component Layout &amp; Styles

Tweak the markup and styling of your component. You can simply refresh your browser to see changes locally.

As you make significant changes, you can push your changes to GitHub and trigger a deployment to make your latest changes.

### 8) Configure SXA Styles (optional)

If desired, configure additional SXA styles for your component in Sitecore: `/sitecore/content/PLAY/playwebsite/Presentation/Styles`

Be sure to implement the styles in the CSS file for your component.

### 9) Serialize to Repo

Finally, you should serialize your component configuration from the remote XM Cloud environment. The default _Play! Summit_ SCS configuration should cover all the items created in this guide.

Detailed instructions are here:
https://doc.sitecore.com/xmc/en/developers/xm-cloud/synchronize-items-between-remote-and-local-xm-cloud-instances-with-the-sitecore-cli.html

## File References

### .env.local

Location: `\src\rendering\.env.local`

Example:

```
SITECORE_EDGE_CONTEXT_ID=1234567890
SITECORE_SITE_NAME=playwebsite
JSS_EDITING_SECRET=54asfwf2aasd5790asdf
```

You can get these values for your specific environment from the XM Cloud Deploy Portal.

### Sample Component

``` react
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

```