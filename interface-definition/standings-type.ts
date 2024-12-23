type standing = {
    [key: string]: string | number | null,
    2: number
    3: string
}

type teamStandings = Array<standing>

export type { standing, teamStandings }