import request from '@/utils/request'

export function getHealth() {
  return request.get<{ status: string }>('/health')
}
