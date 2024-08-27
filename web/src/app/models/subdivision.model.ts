export interface Subdivision {
    id: number;
    code: string;
    name: string;
    longitude: number;
    latitude: number;
    fieldSurveyTerritoryId: number;
    marketId: number;
    subdivisionStatusId: number;
    surveyMethodId: number;
    activeSections: number;
    futureSections: number;
    builtOutSections: number;
    totalLots: number;
    fieldSurveyTerritoryName: string;
    marketName: string;
    marketAbbreviation: string;
    subdivisionStatusCode: string;
    surveyMethodCode: string;
    county: string;
    community: string | null;
    zoom17Date: Date;
    zoom18Date: Date;
    subdivisionGeometryId: number | null;
    subdivisionGeometryBoundingBoxId: number | null;
    subdivisionGeometryBoundaryId: number | null;
    subdivisionGeometryIntelligenceBoundaryId: number;
    subdivisionGeometryIntelligenceBoundaryStatusId: number;
    subdivisionGeometryIntelligenceBoundaryStatusCode: string;
    subdivisionGeometryIntelligenceBoundaryStatusChangeDate: Date;
    nearMapImageDate: Date;
    imageBoxId: number;
    mostRecentIPointBatchDate: Date | null;
    iPoints: any[] | null;
    validatediPoints: any[] | null;
    subdivisionSpecificStatus: string;
}

interface TableConfigItem {
    displayName: string;
    property: keyof Subdivision; // Ensure `property` is a key of `Subdivision`
    sortable?: boolean;
    type?: string;
    width?: number;
    hidden?: boolean
}

export const SUBDIVISION_TABLE_CONFIG: TableConfigItem[] = [
    {displayName: "ID", property: 'id'},
    {displayName: "Code", property: 'code'},
    {displayName: "Name", property: 'name', sortable: true, width: 200},
    {displayName: "Longitude", property: 'longitude', width: 72},
    {displayName: "Latitude", property: 'latitude',  width: 70},
    {displayName: "Field Survey Territory ID", property: 'fieldSurveyTerritoryId'},
    {displayName: "Market ID", property: 'marketId', width: 65},
    {displayName: "Subdivision Status ID", property: 'subdivisionStatusId'},
    {displayName: "Survey Method ID", property: 'surveyMethodId'},
    {displayName: "Active Sections", property: 'activeSections'},
    {displayName: "Future Sections", property: 'futureSections'},
    {displayName: "Built Out Sections", property: 'builtOutSections'},
    {displayName: "Total Lots", property: 'totalLots', width: 60},
    {displayName: "Field Survey Territory Name", property: 'fieldSurveyTerritoryName'},
    {displayName: "Market Name", property: 'marketName', width: 90},
    {displayName: "Market Abbreviation", property: 'marketAbbreviation'},
    {displayName: "Subdivision Status Code", property: 'subdivisionStatusCode'},
    {displayName: "Survey Method Code", property: 'surveyMethodCode'},
    {displayName: "County", property: 'county', width: 60},
    {displayName: "Community", property: 'community'},
    {displayName: "Zoom 17 Date", property: 'zoom17Date', type: 'date', width: 80},
    {displayName: "Zoom 18 Date", property: 'zoom18Date', type: 'date', width: 80},
    {displayName: "Subdivision Geometry ID", property: 'subdivisionGeometryId', hidden: true},
    {displayName: "Subdivision Geometry Bounding Box ID", property: 'subdivisionGeometryBoundingBoxId', hidden: true},
    {displayName: "Subdivision Geometry Boundary ID", property: 'subdivisionGeometryBoundaryId', hidden: true},
    {displayName: "Subdivision Geometry Intelligence Boundary ID", property: 'subdivisionGeometryIntelligenceBoundaryId'},
    {displayName: "Subdivision Geometry Intelligence Boundary Status ID", property: 'subdivisionGeometryIntelligenceBoundaryStatusId', width: 60},
    {displayName: "Subdivision Geometry Intelligence Boundary Status Code", property: 'subdivisionGeometryIntelligenceBoundaryStatusCode'},
    {displayName: "Subdivision Geometry Intelligence Boundary Status Change Date", property: 'subdivisionGeometryIntelligenceBoundaryStatusChangeDate', type: 'date'},
    {displayName: "Near Map Image Date", property: 'nearMapImageDate', sortable: true, type: 'date'},
    {displayName: "Image Box ID", property: 'imageBoxId'},
    {displayName: "Most Recent I Point Batch Date", property: 'mostRecentIPointBatchDate', type: 'date'},
    {displayName: "I Points", property: 'iPoints', width: 30, hidden: true},
    {displayName: "Validated I Points", property: 'validatediPoints', hidden: true},
    {displayName: "Subdivision Specific Status", property: 'subdivisionSpecificStatus'}
];

export type SortKey = keyof Subdivision;
