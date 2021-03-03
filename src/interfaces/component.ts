import { Props } from '../core/component';

export interface Meta {
  tagName: string;
  className: string;
  props: Props;
}

export interface IComponent {
  init(): void;
  componentDidMount(): void;
  setProps(nextProps: Props): void;
  componentDidUpdate(oldProps: Props, newProps: Props): boolean;
  _render(update: boolean): void;
  render(): string;
  show(): void;
  hide(): void;
  _destroy(): void;
  destroy(): void;
  afterViewInit(): void;
  element: HTMLElement | null;
}
