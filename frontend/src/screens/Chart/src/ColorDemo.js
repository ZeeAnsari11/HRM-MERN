import React, { useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';

const ColoredDemo = () => {
  const [data, setData] = useState([
    {
      expanded: true,
      type: 'person',
      className: 'bg-indigo-500 text-white',
      style: { borderRadius: '12px' },
      data: {
        image: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
        name: 'Amy Elsner',
        title: 'CEO'
      },
      children: [
        {
          expanded: true,
          type: 'person',
          className: 'bg-purple-500 text-white',
          style: { borderRadius: '12px' },
          data: {
            image: 'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
            name: 'Anna Fali',
            title: 'CMO'
          },
          children: [
            {
              label: 'Sales',
              className: 'bg-purple-500 text-white',
              style: { borderRadius: '12px' }
            },
            {
              label: 'Marketing',
              className: 'bg-purple-500 text-white',
              style: { borderRadius: '12px' }
            }
          ]
        },
        {
          expanded: true,
          type: 'person',
          className: 'bg-teal-500 text-white',
          style: { borderRadius: '12px' },
          data: {
            image: 'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
            name: 'Stephen Shaw',
            title: 'CTO'
          },
          children: [
            {
              label: 'Development',
              className: 'bg-teal-500 text-white',
              style: { borderRadius: '12px' }
            },
            {
              label: 'UI/UX Design',
              className: 'bg-teal-500 text-white',
              style: { borderRadius: '12px' }
            }
          ]
        }
      ]
    }
  ]);

  const nodeTemplate = (node) => {
    if (node.type === 'person') {
      return (
        <div className="flex flex-column">
          <div className="flex flex-column align-items-center">
            <img alt={node.data.name} src={node.data.image} className="mb-3 w-3rem h-3rem" />
            <span className="font-bold mb-2">{node.data.name}</span>
            <span>{node.data.title}</span>
          </div>
        </div>
      );
    }

    return node.label;
  };

  return (
    <div>
      <OrganizationChart
        value={data}
        nodeTemplate={nodeTemplate}
        className="w-full, h-full mr-auto"
      />
    </div>
  );
};

export default ColoredDemo;
