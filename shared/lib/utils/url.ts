export interface IBuildUrlPathInput {
  segments: (string | number)[]
  query?: Record<string, any>
}

/**
 * 주어진 경로 배열과 쿼리 파라미터를 조합하여 완전한 Path 경로를 생성합니다.
 */
export function buildUrlPath({
  segments,
  query = {},
}: IBuildUrlPathInput): string {
  const path = segments.join('/')
  return `/${path}${makeQueryParams(query)}`
}

/**
 * 쿼리 파라미터 객체를 URL 쿼리 문자열로 변환합니다.
 */
export function makeQueryParams(params?: Record<string, any>): string {
  if (!params) {
    return ''
  }

  const validParams = Object.entries(params).filter(
    ([_, value]) => value !== undefined && value !== null,
  )

  if (validParams.length === 0) return ''

  const searchParams = new URLSearchParams(validParams)

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}
