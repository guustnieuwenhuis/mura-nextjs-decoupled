import Mura from 'mura.js';
import Example from '../components/Example';
import Text, { getTextProps } from '../components/Text';
import Collection, { getCollectionProps } from '../components/Collection';
import Video from '../components/Video';
import Image from '../components/Image';
import Container from '../components/Container';
import Embed from '../components/Embed';
import Hr from '../components/Hr';
import React from 'react';
import ReactDOM from 'react-dom';

//This module is also registered with Mura via the ./static/mura.config.json

let moduleRegistry = [
  {
    name: 'Example',
    component: Example,
  },
  {
    name: 'Text',
    component: Text,
    getDynamicProps: getTextProps,
  },
  {
    name: 'Collection',
    component: Collection,
    getDynamicProps: getCollectionProps,
  },
  {
    name: 'Video',
    component: Video,
  },
  {
    name: 'Image',
    component: Image,
  },
  {
    name: 'Container',
    component: Container,
  },
  {
    name: 'Hr',
    component: Hr,
  },
  {
    name: 'Embed',
    component: Embed,
  },
];

let moduleLookup = {};

moduleRegistry.forEach(module => {
  module.getDynamicProps =
    module.getDynamicProps ||
    function() {
      return {};
    };
  moduleLookup[module.name] = {
    component: module.component,
    getDynamicProps: module.getDynamicProps,
  };

  if (!module.excludeFromClient) {
    Mura.Module[module.name] = Mura.UI.extend({
      component: module.component,
      renderClient() {
        
        const content = Mura.content.getAll();

        ReactDOM.render(
          React.createElement(this.component, {...this.context,content}),
          this.context.targetEl,
          () => {
            this.trigger('afterRender');
          },
        );
      },
    });
  }
});

Mura.Module.Container.reopen({
	reset(self, empty) {
	  self.find('.mura-object:not([data-object="container"])').html('');
	  self.find('.frontEndToolsModal').remove();
	  self.find('.mura-object-meta').html('');
	  var content = self.children('div.mura-object-content');
  
	  if (content.length) {
		var nestedObjects = [];
		content.children('.mura-object').each(function() {
		  Mura.resetAsyncObject(this, empty);
		  //console.log(Mura(this).data())
		  nestedObjects.push(Mura(this).data());
		});
		self.data('items', JSON.stringify(nestedObjects));
		self.removeAttr('data-content');
	  }
	},
  });

export default moduleLookup;