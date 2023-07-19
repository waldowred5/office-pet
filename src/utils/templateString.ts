

export default function templateString(raw: string, properties: { [key: string]: string } = {}): string {
  return Object.entries(properties).reduce((acc, [key, value]) => acc.replaceAll(`{{${key}}}`, value), raw);
}
