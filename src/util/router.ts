import { cache } from "lit-html/directives/cache.js";
import { TemplateResult } from "lit-html";
import { html } from "lit-html";
import Route from "route-parser";
import { classMap, ClassInfo } from "lit-html/directives/class-map.js";

type LinkProps = {
  type: string;
  content: number | string | TemplateResult;
  route: string;
  classInfo?: ClassInfo;
  params?: any;
};

export const navigate = (link: LinkProps, service) => evt => {
  evt.preventDefault();
  const hash = (evt.target.hash || "").substring(1);
  service.send({ ...link, hash });
};

export const Link = (state, service, props: LinkProps) => {
  const route = new Route(props.route);
  return html`
    <a
      class="${classMap(props.classInfo)}"
      href="#${route.reverse(props.params)}"
      @click=${navigate(props, service)}
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
