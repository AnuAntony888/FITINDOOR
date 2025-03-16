export function DataMerge(pgainatedData, key = "data", subkey = null) {
  return Array.isArray(pgainatedData)
    ? pgainatedData?.reduce(function (flat, toFlatten) {
        return flat.concat(
          Array.isArray(subkey ? toFlatten[key][subkey] : toFlatten[key])
            ? DataMerge(subkey ? toFlatten[key][subkey] : toFlatten[key])
            : toFlatten
        );
      }, [])
    : pgainatedData;
}
