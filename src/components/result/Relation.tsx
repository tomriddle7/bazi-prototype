import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { SexagenaryCard } from "@/components/result/SexagenaryCard";

const Relation = ({ pillar, data: { combinations, punishments, clashes, destructions, harms } }) => {
    return (
        <>
            <div className="w-full rounded-lg border border-neutral-200 overflow-hidden">
                <Table>
                    <TableBody>
                        {combinations.filter((comb) => comb.type.key === 'stemCombination').map((comb, index) => (
                            <TableRow key={`stem-comb-${index}`}>
                                <TableHead className="text-center text-xs font-medium h-7" scope="row">합</TableHead>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{comb.positions.indexOf("hour") > -1 && comb.pair[comb.positions.indexOf("hour")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{comb.positions.indexOf("day") > -1 && comb.pair[comb.positions.indexOf("day")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{comb.positions.indexOf("month") > -1 && comb.pair[comb.positions.indexOf("month")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{comb.positions.indexOf("year") > -1 && comb.pair[comb.positions.indexOf("year")]}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableHead scope="row"></TableHead>
                            <TableCell>
                                <SexagenaryCard
                                    hanja={pillar?.hour[0]}
                                />
                            </TableCell>
                            <TableCell>
                                <SexagenaryCard
                                    hanja={pillar?.day[0]}
                                />
                            </TableCell>
                            <TableCell>
                                <SexagenaryCard
                                    hanja={pillar?.month[0]}
                                />
                            </TableCell>
                            <TableCell>
                                <SexagenaryCard
                                    hanja={pillar?.year[0]}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead scope="row"></TableHead>
                            <TableCell>
                                <SexagenaryCard
                                    hanja={pillar?.hour[1]}
                                />
                            </TableCell>
                            <TableCell>
                                <SexagenaryCard
                                    hanja={pillar?.day[1]}
                                />
                            </TableCell>
                            <TableCell>
                                <SexagenaryCard
                                    hanja={pillar?.month[1]}
                                />
                            </TableCell>
                            <TableCell>
                                <SexagenaryCard
                                    hanja={pillar?.year[1]}
                                />
                            </TableCell>
                        </TableRow>
                        {combinations.filter((comb) => comb.type.key !== 'stemCombination' && comb.isComplete !== false).map((comb, index) => (
                            <TableRow key={`branch-comb-${index}`}>
                                <TableHead className="text-center text-xs font-medium h-7" scope="row">합</TableHead>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{comb.positions.indexOf("hour") > -1 && comb.pair[comb.positions.indexOf("hour")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{comb.positions.indexOf("day") > -1 && comb.pair[comb.positions.indexOf("day")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{comb.positions.indexOf("month") > -1 && comb.pair[comb.positions.indexOf("month")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{comb.positions.indexOf("year") > -1 && comb.pair[comb.positions.indexOf("year")]}</TableCell>
                            </TableRow>
                        ))}
                        {punishments.map((rel, index) => (
                            <TableRow key={`branch-punish-${index}`}>
                                <TableHead className="text-center text-xs font-medium h-7" scope="row">형</TableHead>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("hour") > -1 && rel.branches[rel.positions.indexOf("hour")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("day") > -1 && rel.branches[rel.positions.indexOf("day")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("month") > -1 && rel.branches[rel.positions.indexOf("month")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("year") > -1 && rel.branches[rel.positions.indexOf("year")]}</TableCell>
                            </TableRow>
                        ))}
                        {clashes.map((rel, index) => (
                            <TableRow key={`branch-clash-${index}`}>
                                <TableHead className="text-center text-xs font-medium h-7" scope="row">충</TableHead>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("hour") > -1 && rel.pair[rel.positions.indexOf("hour")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("day") > -1 && rel.pair[rel.positions.indexOf("day")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("month") > -1 && rel.pair[rel.positions.indexOf("month")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("year") > -1 && rel.pair[rel.positions.indexOf("year")]}</TableCell>
                            </TableRow>
                        ))}
                        {destructions.map((rel, index) => (
                            <TableRow key={`branch-des-${index}`}>
                                <TableHead className="text-center text-xs font-medium h-7" scope="row">파</TableHead>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("hour") > -1 && rel.pair[rel.positions.indexOf("hour")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("day") > -1 && rel.pair[rel.positions.indexOf("day")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("month") > -1 && rel.pair[rel.positions.indexOf("month")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("year") > -1 && rel.pair[rel.positions.indexOf("year")]}</TableCell>
                            </TableRow>
                        ))}
                        {harms.map((rel, index) => (
                            <TableRow key={`branch-harm-${index}`}>
                                <TableHead className="text-center text-xs font-medium h-7" scope="row">해</TableHead>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("hour") > -1 && rel.pair[rel.positions.indexOf("hour")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("day") > -1 && rel.pair[rel.positions.indexOf("day")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("month") > -1 && rel.pair[rel.positions.indexOf("month")]}</TableCell>
                                <TableCell className="text-center text-xs font-medium h-7" scope="col">{rel.positions.indexOf("year") > -1 && rel.pair[rel.positions.indexOf("year")]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

export default Relation;
