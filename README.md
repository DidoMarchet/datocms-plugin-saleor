<h1 data-with-anchor="true" class="style_root__27fLI ">DatoCMS Commerce Layer plugin<!-- --> <a data-anchor="datocms-commerce-layer-plugin" id="datocms-commerce-layer-plugin"></a><a data-permalink="true" href="#datocms-commerce-layer-plugin"></a></h1>

<p>A plugin that allows users to search and select Commerce Layer SKUs.</p>

<h2 data-with-anchor="true" class="style_root__27fLI ">App credentials (Commerce Layer)<!-- --> <a data-anchor="app-credentials-commerce-layer" id="app-credentials-commerce-layer"></a><a data-permalink="true" href="#app-credentials-commerce-layer"></a></h2>

<p>To use this plugin first you need to create a Commerce Layer OAuth application and take note of its credentials. If you don't have a Commerce Layer account you can sign up for free <a href="https://dashboard.commercelayer.io/sign_up">here</a> and follow the <a href="https://docs.commercelayer.io/developers/welcome/onboarding-tutorial">onboarding tutorial</a> to create an organization and seed it with test data. Once successfully signed in to the Commerce Layer admin dashboard, go into your organization's <em>Integrations</em> section and create a new integration app with role <em>Read only</em>:</p>

<p><figure><div><img alt="New application" src="https://unpkg.com/datocms-plugin-commercelayer@2.0.4/docs/new-app.png?auto=format&amp;fit=max&amp;w=900"></div></figure></p>

<p>Now you can access the application's base endpoint, client ID, and client secret:</p>

<p><figure><div><img alt="Application credentials" src="https://unpkg.com/datocms-plugin-commercelayer@2.0.4/docs/app-credentials.png?auto=format&amp;fit=max&amp;w=900"></div></figure></p>

<blockquote>
<p><strong>BACKWARD COMPATIBILITY</strong> — Please note that if you are upgrading from a previous version (older than <code>v2.0.0</code>) you need to change your plugin settings to use an <em>integration</em> app because old <em>datocms</em> Commerce Layer apps have been dismissed and don't work with the new versions of the plugin.</p>
</blockquote>

<h2 data-with-anchor="true" class="style_root__27fLI ">Plugin configuration (DatoCMS) <a data-anchor="plugin-configuration-datocms" id="plugin-configuration-datocms"></a><a data-permalink="true" href="#plugin-configuration-datocms"></a></h2>

<p>You can search the plugin from the DatoCMS admin dashboard or install it from the <a href="https://www.datocms.com/marketplace/plugins/i/datocms-plugin-commercelayer">marketplace</a>. Once installed, you need to configure the plugin with the credentials you get from Commerce Layer app you previously created:</p>

<p><figure><div><img alt="Plugin settings" src="https://unpkg.com/datocms-plugin-commercelayer@2.0.4/docs/plugin-settings.jpg?auto=format&amp;fit=max&amp;w=900"></div></figure></p>

<p>You can either hook this plugin manually to your single-line fields, or specify an identifier and use it to create an automatic match rule (e.g. via regex).</p>

<h2 data-with-anchor="true" class="style_root__27fLI ">Usage<!-- --> <a data-anchor="plugin-configuration-datocms" id="plugin-configuration-datocms"></a><a data-permalink="true" href="#plugin-configuration-datocms"></a></h2>

<p>To use the plugin you need to add a single-line text field to your model in DatoCMS and select <em>Commerce Layer SKU</em> from the dropdown menu in the <em>Presentation</em> tab:</p>

<p><figure><div><img alt="Field type" src="https://unpkg.com/datocms-plugin-commercelayer@2.0.4/docs/field-type.png?auto=format&amp;fit=max&amp;w=900"></div></figure>
<figure><div><img alt="Field settings" src="https://unpkg.com/datocms-plugin-commercelayer@2.0.4/docs/field-settings.jpg?auto=format&amp;fit=max&amp;w=900"></div></figure>
<figure><div><img alt="Field presentation" src="https://unpkg.com/datocms-plugin-commercelayer@2.0.4/docs/field-presentation.png?auto=format&amp;fit=max&amp;w=900"></div></figure></p>

<p>Now you can browse your Commerce Layer organization SKUs, search and select them from the UI. You can also create and add new SKUs by clicking the button that redirects to Commerce Layer admin dashboard:</p>

<p><figure><div><img alt="SKU search" src="https://unpkg.com/datocms-plugin-commercelayer@2.0.4/docs/SKU-search.png?auto=format&amp;fit=max&amp;w=900"></div></figure>
<figure><div><img alt="SKU selection" src="https://unpkg.com/datocms-plugin-commercelayer@2.0.4/docs/SKU-selection.png?auto=format&amp;fit=max&amp;w=900"></div></figure></p>

<p>The selected SKU's main information will then show in the related record:</p>

<p><figure><div><img alt="SKU visualization" src="https://unpkg.com/datocms-plugin-commercelayer@2.0.4/docs/SKU-visualization.png?auto=format&amp;fit=max&amp;w=900"></div></figure></p>
