import { cache } from 'lit-html/directives/cache.js';
import { TemplateResult, Template } from 'lit-html';
import { html } from 'lit-html';
import Route from 'route-parser';

type LinkProps = {
  type: string;
  content: number | string | TemplateResult;
  route: string;
  params?: any;
};

export const navigate = (link: LinkProps, service) => evt => {
  evt.preventDefault();
  const hash = (evt.target.hash || '').substring(1);
  service.send({ ...link, hash });
};

export const Link = (props: LinkProps, service) => {
  const route = new Route(props.route);
  return html`
    <a href="#${route.reverse(props.params)}" @click=${navigate(props, service)}
      >${props.content}</a
    >
  `;
};

export const Switch = (
  value,
  templates: { value: string; template: TemplateResult }[]
) => {
  return cache(templates.find(template => template.value === value).template);
};
