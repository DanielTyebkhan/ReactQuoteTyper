export interface IQuote {
  id: number,
  language: string,
  content: string,
  originator: IOriginator
}

export interface IOriginator {
  id: number,
  name: string,
  url: string
} 